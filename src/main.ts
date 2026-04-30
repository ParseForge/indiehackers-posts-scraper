import { Actor, log } from 'apify';
import c from 'chalk';
import * as cheerio from 'cheerio';

interface Input {
    maxItems?: number;
    keywordFilter?: string;
}

const STARTUP = ['🚀 Pulling Indie Hackers posts…', '💡 Crawling Indie Hackers community…', '📰 Reading the latest founder stories…'];
const DONE = ['🎉 Indie Hackers export ready.', '✅ Founder stories delivered.', '🚀 Posts ready to read.'];
const pick = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)] ?? arr[0]!;

const SITEMAP_INDEX = 'https://www.indiehackers.com/sitemap.xml';

await Actor.init();
const input = (await Actor.getInput<Input>()) ?? {};
const userIsPaying = Boolean(Actor.getEnv()?.userIsPaying);
const isPayPerEvent = Actor.getChargingManager().getPricingInfo().isPayPerEvent;

let effectiveMaxItems = input.maxItems ?? 10;
if (!userIsPaying) {
    if (!effectiveMaxItems || effectiveMaxItems > 10) {
        effectiveMaxItems = 10;
        log.warning([
            '',
            `${c.dim('        *  .  ✦        .    *       .')}`,
            `${c.dim('  .        *')}    🛰️  ${c.dim('.        *   .    ✦')}`,
            `${c.dim('     ✦  .        .       *        .')}`,
            '',
            `${c.yellow("  You're on a free plan — limited to 10 items.")}`,
            `${c.cyan('  Upgrade to a paid plan for up to 1,000,000 items.')}`,
            '',
            `  ✦ ${c.green.underline('https://console.apify.com/sign-up?fpr=vmoqkp')}`,
            '',
        ].join('\n'));
    }
}

const keyword = (input.keywordFilter ?? '').trim().toLowerCase();

console.log(c.cyan('\n🛰️  Arguments:'));
if (keyword) console.log(c.green(`   🟩 keywordFilter : ${keyword}`));
console.log(c.green(`   🟩 maxItems : ${effectiveMaxItems}`));
console.log('');
console.log(c.magenta(`📬 ${pick(STARTUP)}\n`));

async function getText(url: string): Promise<string | null> {
    try {
        const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 ApifyIndieHackers/1.0' } });
        if (!r.ok) return null;
        return await r.text();
    } catch { return null; }
}

function extractLocs(xml: string): string[] {
    const out: string[] = [];
    const re = /<loc>([^<]+)<\/loc>/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(xml)) !== null) out.push(m[1]!);
    return out;
}

function decodeHtml(s: string): string {
    return s.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x27;/g, "'").replace(/&#39;/g, "'");
}

log.info('📡 Loading sitemap index…');
const indexXml = await getText(SITEMAP_INDEX);
if (!indexXml) {
    await Actor.pushData([{ error: 'Could not load sitemap index.' }]);
    await Actor.exit();
}
const sitemapUrls = extractLocs(indexXml!);
log.info(`   ${sitemapUrls.length} sitemaps found`);

let pushed = 0;
for (const sitemapUrl of sitemapUrls) {
    if (pushed >= effectiveMaxItems) break;
    log.info(`📡 Loading ${sitemapUrl}…`);
    const xml = await getText(sitemapUrl);
    if (!xml) continue;
    const allUrls = extractLocs(xml);
    const postUrls = allUrls.filter((u) => u.includes('/post/') && (!keyword || u.toLowerCase().includes(keyword)));
    log.info(`   ${postUrls.length} post URLs in this sitemap`);

    for (const postUrl of postUrls) {
        if (pushed >= effectiveMaxItems) break;
        const slugMatch = postUrl.match(/\/post\/(?:[^/]+\/)?([^/?#]+)$/);
        const slug = slugMatch ? slugMatch[1] : null;
        const sectionMatch = postUrl.match(/\/post\/([^/]+)\/[^/]+$/);
        const section = sectionMatch ? sectionMatch[1] : null;
        const idMatch = slug?.match(/-([A-Za-z0-9]{16,})$/);
        const postId = idMatch ? idMatch[1] : null;
        const titleFromSlug = slug
            ? slug.replace(/-[A-Za-z0-9]{16,}$/, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
            : null;

        const item: Record<string, unknown> = {
            url: postUrl,
            postId,
            slug,
            section,
            title: titleFromSlug,
            scrapedAt: new Date().toISOString(),
        };

        if (isPayPerEvent) await Actor.pushData([item], 'result-item');
        else await Actor.pushData([item]);
        pushed += 1;
    }
}

if (pushed === 0) await Actor.pushData([{ error: 'No posts matched.' }]);
log.info(c.green(`✅ Pushed ${pushed} posts`));
console.log(c.magenta(`\n${pick(DONE)}`));
await Actor.exit();
