![ParseForge Banner](https://github.com/ParseForge/apify-assets/blob/ad35ccc13ddd068b9d6cba33f323962e39aed5b2/banner.jpg?raw=true)

# 💼 Indie Hackers Posts Scraper

> 🚀 **Pull every Indie Hackers post URL with section, ID, and decoded title.** Discovered via the official sitemap. No login, no API key, no manual scrolling.

> 🕒 **Last updated:** 2026-05-01 · **📊 6 fields** per post · **💼 47,000+ posts indexed** · **🏗️ founder-driven community** · **🆓 sitemap-based discovery**

The **Indie Hackers Posts Scraper** discovers every post URL from the official Indie Hackers sitemap and returns slug, section, post ID, decoded title, URL, and scrape timestamp. The sitemap covers more than 47,000 posts across founder stories, startup advice, product launches, and community discussions.

Indie Hackers is the largest community of bootstrapped founders sharing revenue numbers, growth tactics, and lessons learned. The post archive is a primary research surface for product-market-fit research, content marketing inspiration, and founder interviews. This Actor exposes the full post catalog as structured data with optional keyword filtering.

| 🎯 Target Audience | 💡 Primary Use Cases |
|---|---|
| Founders, content marketers, product researchers, journalists, startup analysts | Founder research, content inspiration, trend tracking, audience discovery |

---

## 📋 What the Indie Hackers Posts Scraper does

Three filtering workflows in a single run:

- 📑 **Full sitemap discovery.** Walks the Indie Hackers sitemap index across 5 sub-sitemaps and aggregates 47k+ post URLs.
- 🔍 **Keyword filter.** Substring match on the URL slug to narrow to a topic.
- 🏷️ **Section detection.** Each post URL embeds a section (creators, starting-up, building, etc.) which is parsed into a separate field.

Each row reports the post URL, slug, section, post ID (16-character suffix on the slug), title decoded from the kebab-case slug, and a scrape timestamp.

> 💡 **Why it matters:** Indie Hackers is built on the assumption that founders learn best from each other's open lessons. The post archive is therefore unusually high signal per row: revenue numbers, traction strategies, hiring stories, pricing experiments. Researchers cite IH posts in startup studies. Content marketers mine IH for proven angles. This Actor turns the open archive into structured rows you can filter and analyze.

---

## 🎬 Full Demo

_🚧 Coming soon: a 3-minute walkthrough showing how to go from sign-up to a downloaded dataset._

---

## ⚙️ Input

<table>
<thead>
<tr><th>Input</th><th>Type</th><th>Default</th><th>Behavior</th></tr>
</thead>
<tbody>
<tr><td><code>maxItems</code></td><td>integer</td><td><code>10</code></td><td>Posts to return. Free plan caps at 10, paid plan at 1,000,000.</td></tr>
<tr><td><code>keywordFilter</code></td><td>string</td><td>empty</td><td>Substring filter on URL slug. Case-insensitive. Empty returns everything.</td></tr>
</tbody>
</table>

**Example: 100 posts that mention pricing.**

```json
{
    "maxItems": 100,
    "keywordFilter": "pricing"
}
```

**Example: 1,000 most recent posts across all topics.**

```json
{
    "maxItems": 1000
}
```

> ⚠️ **Good to Know:** Indie Hackers post pages are client-rendered Ember and the per-post HTML does not return body content from a plain HTTP fetch. This Actor is intentionally scoped to the URL list plus title decoded from the slug. Body content extraction would need a headless browser and is out of scope for v1.

---

## 📊 Output

Each post record contains **6 fields**. Download as CSV, Excel, JSON, or XML.

### 🧾 Schema

| Field | Type | Example |
|---|---|---|
| 🔗 `url` | string | `"https://www.indiehackers.com/post/creators/elon-musk-put-links..."` |
| 🆔 `postId` | string | `"39fXuRt38HqKMEFlEE9x"` |
| 🔖 `slug` | string | `"elon-musk-put-links-in-replies-not-the-main-x-post-39fXuRt38HqKMEFlEE9x"` |
| 🏷️ `section` | string | `"creators"` |
| 📰 `title` | string | `"Elon Musk Put Links In Replies Not The Main X Post"` |
| 🕒 `scrapedAt` | ISO 8601 | `"2026-05-01T02:00:17.096Z"` |

### 📦 Sample records

<details>
<summary><strong>📰 Founder commentary post in the creators section</strong></summary>

```json
{
    "url": "https://www.indiehackers.com/post/creators/elon-musk-put-links-in-replies-not-the-main-x-post-39fXuRt38HqKMEFlEE9x",
    "postId": "39fXuRt38HqKMEFlEE9x",
    "slug": "elon-musk-put-links-in-replies-not-the-main-x-post-39fXuRt38HqKMEFlEE9x",
    "section": "creators",
    "title": "Elon Musk Put Links In Replies Not The Main X Post",
    "scrapedAt": "2026-05-01T02:00:17.096Z"
}
```

</details>

<details>
<summary><strong>🏗️ Starting-up post about validation</strong></summary>

```json
{
    "url": "https://www.indiehackers.com/post/starting-up/how-i-validated-my-saas-in-30-days-aBcD1234EfGh5678",
    "postId": "aBcD1234EfGh5678",
    "slug": "how-i-validated-my-saas-in-30-days-aBcD1234EfGh5678",
    "section": "starting-up",
    "title": "How I Validated My Saas In 30 Days",
    "scrapedAt": "2026-05-01T02:00:18.110Z"
}
```

</details>

<details>
<summary><strong>📈 Growth post in the building section</strong></summary>

```json
{
    "url": "https://www.indiehackers.com/post/building/from-0-to-10k-mrr-in-6-months-XyZ987654321WvUt",
    "postId": "XyZ987654321WvUt",
    "slug": "from-0-to-10k-mrr-in-6-months-XyZ987654321WvUt",
    "section": "building",
    "title": "From 0 To 10K Mrr In 6 Months",
    "scrapedAt": "2026-05-01T02:00:18.620Z"
}
```

</details>

---

## ✨ Why choose this Actor

| | Capability |
|---|---|
| 🆓 | **Free public sitemap.** Reads the official Indie Hackers sitemap index. |
| 📑 | **47k+ posts.** Full historical post archive across every section. |
| 🏷️ | **Section parsing.** URL section extracted into its own field for easy filtering. |
| 🔍 | **Keyword filter.** Substring match on slug narrows by topic. |
| 🚀 | **Sub-10-second runs.** A 100-row pull typically finishes in under 10 seconds. |
| 🆔 | **Stable post IDs.** Every post has a 16-character suffix you can track over time. |
| 🛠️ | **No login.** No account, no captcha, no cookies. |

> 📊 In a single 6-second run the Actor returned 100 post URLs from the live Indie Hackers sitemap.

---

## 📈 How it compares to alternatives

| Approach | Cost | Coverage | Refresh | Filters | Setup |
|---|---|---|---|---|---|
| Manual scroll on indiehackers.com | Free | Limited per session | One-shot | None | Account login |
| Generic web scrapers | $$ subscription | Brittle CSS | Daily | None | Engineer hours |
| RSS readers | Free | Latest 20 only | Live | None | Per-feed setup |
| **⭐ Indie Hackers Posts Scraper** *(this Actor)* | Pay-per-event | Full sitemap | Live | Keyword | None |

Same sitemap Indie Hackers itself publishes for search engines, exposed as structured rows.

---

## 🚀 How to use

1. 🆓 **Create a free Apify account.** [Sign up here](https://console.apify.com/sign-up?fpr=vmoqkp) and get $5 in free credit.
2. 🔍 **Open the Actor.** Search for "Indie Hackers Posts" in the Apify Store.
3. ⚙️ **Set the keyword filter.** Optional. Leave empty for the full archive.
4. ▶️ **Click Start.** A 100-post run finishes in under 10 seconds.
5. 📥 **Download.** Export as CSV, Excel, JSON, or XML.

> ⏱️ Total time from sign-up to first dataset: under five minutes.

---

## 💼 Business use cases

<table>
<tr>
<td width="50%">

### 📰 Content marketing
- Mine high-engagement post angles for inspiration
- Track competitor posts in your space
- Identify recurring topic clusters
- Build editorial calendars from real founder questions

</td>
<td width="50%">

### 🏗️ Founder research
- Survey how peers solved a specific problem
- Track who is shipping what each month
- Find proof-of-traction case studies
- Reverse-engineer GTM playbooks

</td>
</tr>
<tr>
<td width="50%">

### 📊 Market research
- Size niche communities by post volume
- Track hot topic shifts month over month
- Build qualitative datasets for VC scouting
- Map founder pain points across stages

</td>
<td width="50%">

### 📰 Journalism
- Find sources for stories on bootstrapped startups
- Cite specific posts with stable URLs
- Track founder threads across the archive
- Identify rising founder voices early

</td>
</tr>
</table>

---

## 🌟 Beyond business use cases

Data like this powers more than commercial workflows. The same structured records support research, education, civic projects, and personal initiatives.

<table>
<tr>
<td width="50%">

### 🎓 Research and academia
- Empirical datasets for papers, thesis work, and coursework
- Longitudinal studies tracking changes across snapshots
- Reproducible research with cited, versioned data pulls
- Classroom exercises on data analysis and ethical scraping

</td>
<td width="50%">

### 🎨 Personal and creative
- Side projects, portfolio demos, and indie app launches
- Data visualizations, dashboards, and infographics
- Content research for bloggers, YouTubers, and podcasters
- Hobbyist collections and personal trackers

</td>
</tr>
<tr>
<td width="50%">

### 🤝 Non-profit and civic
- Transparency reporting and accountability projects
- Advocacy campaigns backed by public-interest data
- Community-run databases for local issues
- Investigative journalism on public records

</td>
<td width="50%">

### 🧪 Experimentation
- Prototype AI and machine-learning pipelines with real data
- Validate product-market hypotheses before engineering spend
- Train small domain-specific models on niche corpora
- Test dashboard concepts with live input

</td>
</tr>
</table>

---

## 🔌 Automating Indie Hackers Posts Scraper

Run this Actor on a schedule, from your codebase, or inside another tool:

- **Node.js** SDK: see [Apify JavaScript client](https://docs.apify.com/api/client/js/) for programmatic runs.
- **Python** SDK: see [Apify Python client](https://docs.apify.com/api/client/python/) for the same flow in Python.
- **HTTP API**: see [Apify API docs](https://docs.apify.com/api/v2) for raw REST integration.

Schedule daily runs from the Apify Console to track new posts. Pipe results into Google Sheets, S3, BigQuery, or your own webhook with the built-in [integrations](https://docs.apify.com/platform/integrations).

---

## ❓ Frequently Asked Questions

<details>
<summary><strong>📑 What sections are covered?</strong></summary>

Every section IH publishes including creators, starting-up, building, ideas, growth, no-code, money, monetization, AI, and more. The section name is parsed directly from the URL.

</details>

<details>
<summary><strong>📝 Does it return post body content?</strong></summary>

No. Indie Hackers post pages are fully client-rendered Ember; a plain HTTP fetch returns the homepage shell. This Actor returns URL plus slug-decoded title only. Full body content would need browser automation.

</details>

<details>
<summary><strong>🆔 What is the postId?</strong></summary>

The 16-character alphanumeric suffix at the end of every Indie Hackers post slug. It is stable, unique, and works as a primary key across runs.

</details>

<details>
<summary><strong>🔍 How does keywordFilter work?</strong></summary>

Substring match against the URL slug, case-insensitive. Pass `pricing` to find posts whose slug contains `pricing`. Leave empty for the full archive.

</details>

<details>
<summary><strong>📅 How recent are the posts?</strong></summary>

The sitemap is updated frequently and includes posts up to the most recent ones. Each run hits the live sitemap.

</details>

<details>
<summary><strong>📦 How many posts can I pull?</strong></summary>

Free plan caps at 10. Paid plans go up to 1,000,000. The sitemap currently holds more than 47,000 posts in total.

</details>

<details>
<summary><strong>🔠 Why is the title in title-case-of-kebab?</strong></summary>

The title is decoded from the URL slug because the per-post HTML does not return the original headline reliably. Capitalization is title case. The original author headline may differ in style.

</details>

<details>
<summary><strong>💼 Can I use this for commercial work?</strong></summary>

Yes. The Actor reads only the public sitemap that Indie Hackers publishes for search engines. Always honor IH's terms when republishing content.

</details>

<details>
<summary><strong>💳 Do I need a paid Apify plan?</strong></summary>

The free plan returns up to 10 posts per run. Paid plans return up to 1,000,000.

</details>

<details>
<summary><strong>⚠️ What if a run fails?</strong></summary>

The most likely cause is a temporary sitemap fetch failure. Retry once. If the issue persists, [open a contact form](https://tally.so/r/BzdKgA) and include the run URL.

</details>

<details>
<summary><strong>🔁 How fresh is the data?</strong></summary>

Live. Each run hits the IH sitemap at run time.

</details>

<details>
<summary><strong>⚖️ Is this legal?</strong></summary>

Yes. The Actor reads the publicly published sitemap that IH explicitly serves to search engines for indexing. It does not bypass any access control.

</details>

---

## 🔌 Integrate with any app

- [**Make**](https://apify.com/integrations/make) - drop run results into 1,800+ apps.
- [**Zapier**](https://apify.com/integrations/zapier) - trigger automations off completed runs.
- [**Slack**](https://apify.com/integrations/slack) - post run summaries to a channel.
- [**Google Sheets**](https://apify.com/integrations/google-sheets) - sync each run into a spreadsheet.
- [**Webhooks**](https://docs.apify.com/platform/integrations/webhooks) - notify your own services on run finish.
- [**Airbyte**](https://apify.com/integrations/airbyte) - load runs into Snowflake, BigQuery, or Postgres.

---

## 🔗 Recommended Actors

- [**📰 Substack Publication Scraper**](https://apify.com/parseforge/substack-publication-scraper) - founder-friendly newsletter archive scraper.
- [**🐝 Beehiiv Newsletter Scraper**](https://apify.com/parseforge/beehiiv-newsletter-scraper) - the same workflow for Beehiiv-hosted newsletters.
- [**🐙 GitHub Trending Repos Scraper**](https://apify.com/parseforge/github-trending-scraper) - pair founder posts with developer-attention data.
- [**📚 Wikipedia Pageviews Scraper**](https://apify.com/parseforge/wikipedia-pageviews-scraper) - cross-reference founder topics with public-interest spikes.
- [**🅱️ Bing Search Scraper**](https://apify.com/parseforge/bing-search-scraper) - track which IH posts rank for which keywords.

> 💡 **Pro Tip:** browse the complete [ParseForge collection](https://apify.com/parseforge) for more pre-built scrapers and data tools.

---

**🆘 Need Help?** [**Open our contact form**](https://tally.so/r/BzdKgA) and we'll route the question to the right person.

---

> Indie Hackers is a registered trademark of Stripe, Inc. This Actor is not affiliated with or endorsed by Indie Hackers or Stripe. It reads only the publicly published sitemap.
