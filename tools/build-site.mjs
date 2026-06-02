import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://imadaouali.github.io";
const UPDATED = "2026-06-02";

const papers = [
  {
    slug: "2025_diffusion_bandit",
    pdf: "2025_diffusion_bandit.pdf",
    groupYear: "2025",
    citationDate: "2025",
    title: "Diffusion Models Meet Contextual Bandits",
    authors: ["Imad Aouali"],
    venue: "NeurIPS 2025",
    citationVenue: "Advances in Neural Information Processing Systems 38",
    volume: "38",
    externalUrl:
      "https://proceedings.neurips.cc/paper_files/paper/2025/hash/f380d194841c2d964ccce94460d9d490-Abstract-Conference.html",
    abstract:
      "Efficient online decision-making in contextual bandits is challenging, as methods without informative priors often suffer from computational or statistical inefficiencies. In this work, we leverage pre-trained diffusion models as expressive priors to capture complex action dependencies and develop a practical algorithm that efficiently approximates posteriors under such priors, enabling both fast updates and sampling. Empirical results demonstrate the effectiveness and versatility of our approach across diverse contextual bandit settings.",
  },
  {
    slug: "2025_opl_las",
    pdf: "2025_opl_las.pdf",
    groupYear: "2026",
    citationDate: "2026",
    title:
      "Off-Policy Learning in Large Action Spaces: Optimization Matters More Than Estimation",
    authors: ["Imad Aouali", "Otmane Sakhi"],
    venue: "ICML 2026",
    citationVenue: "ICML 2026",
    arxivId: "2509.03456",
    externalUrl: "https://arxiv.org/abs/2509.03456",
    abstract:
      "Off-policy evaluation (OPE) and off-policy learning (OPL) are foundational for decision-making in offline contextual bandits. Recent advances in OPL primarily optimize OPE estimators with improved statistical properties, assuming that better estimators inherently yield superior policies. Although theoretically justified, we argue this estimator-centric approach neglects a critical practical obstacle: challenging optimization landscapes. In this paper, we provide theoretical insights and extensive empirical evidence showing that current OPL methods encounter severe optimization issues, particularly as action spaces become large. We demonstrate that simpler weighted log-likelihood objectives enjoy substantially better optimization properties and still recover competitive, often superior, learned policies. Our findings emphasize the necessity of explicitly addressing optimization considerations in the development of OPL algorithms for large action spaces.",
  },
  {
    slug: "2025_counterfactual_sample_identification",
    pdf: "2025_counterfactual_sample_identification.pdf",
    groupYear: "2025",
    citationDate: "2025",
    title: "Offline Contextual Bandit with Counterfactual Sample Identification",
    authors: [
      "Alexandre Gilotte",
      "Otmane Sakhi",
      "Imad Aouali",
      "Benjamin Heymann",
    ],
    venue: "RecSys 2025 CONSEQUENCES Workshop",
    citationVenue: "RecSys 2025 CONSEQUENCES Workshop",
    arxivId: "2509.10520",
    externalUrl: "https://arxiv.org/abs/2509.10520",
    abstract:
      "In production systems, contextual bandit approaches often rely on direct reward models that take both action and context as input. However, these models can suffer from confounding, making it difficult to isolate the effect of the action from that of the context. We present Counterfactual Sample Identification, a new approach that re-frames the problem: rather than predicting reward, it learns to recognize which action led to a successful binary outcome by comparing it to a counterfactual action sampled from the logging policy under the same context. The method is theoretically grounded and consistently outperforms direct models in both synthetic experiments and real-world deployments.",
  },
  {
    slug: "2025_structured_dm",
    pdf: "2025_structured_dm.pdf",
    groupYear: "2025",
    citationDate: "2025",
    title: "Bayesian Off-Policy Evaluation and Learning for Large Action Spaces",
    authors: [
      "Imad Aouali",
      "Victor-Emmanuel Brunel",
      "David Rohde",
      "Anna Korba",
    ],
    venue: "AISTATS 2025",
    citationVenue:
      "Proceedings of The 28th International Conference on Artificial Intelligence and Statistics",
    volume: "258",
    firstPage: "136",
    lastPage: "144",
    arxivId: "2402.14664",
    externalUrl: "https://proceedings.mlr.press/v258/aouali25a.html",
    abstract:
      "In interactive systems, actions are often correlated, presenting an opportunity for more sample-efficient off-policy evaluation (OPE) and learning (OPL) in large action spaces. We introduce a unified Bayesian framework to capture these correlations through structured and informative priors. In this framework, we propose sDM, a generic Bayesian approach for OPE and OPL, grounded in both algorithmic and theoretical foundations. Notably, sDM leverages action correlations without compromising computational efficiency. Moreover, inspired by online Bayesian bandits, we introduce Bayesian metrics that assess the average performance of algorithms across multiple problem instances, deviating from the conventional worst-case assessments. We analyze sDM in OPE and OPL, highlighting the benefits of leveraging action correlations. Empirical evidence showcases the strong performance of sDM.",
  },
  {
    slug: "2025_bayes_bai",
    pdf: "2025_bayes_bai.pdf",
    groupYear: "2025",
    citationDate: "2025",
    title:
      "Prior-Dependent Allocations for Bayesian Fixed-Budget Best-Arm Identification in Structured Bandits",
    authors: ["Nicolas Nguyen", "Imad Aouali", "András György", "Claire Vernade"],
    venue: "AISTATS 2025",
    citationVenue:
      "Proceedings of The 28th International Conference on Artificial Intelligence and Statistics",
    volume: "258",
    firstPage: "379",
    lastPage: "387",
    arxivId: "2402.05878",
    externalUrl: "https://proceedings.mlr.press/v258/nguyen25a.html",
    abstract:
      "We study the problem of Bayesian fixed-budget best-arm identification (BAI) in structured bandits. We propose an algorithm that uses fixed allocations based on the prior information and the structure of the environment. We provide theoretical bounds on its performance across diverse models, including the first prior-dependent upper bounds for linear and hierarchical BAI. Our key contribution lies in introducing novel proof techniques that yield tighter bounds for multi-armed BAI compared to existing approaches. Our work provides new insights into Bayesian fixed-budget BAI in structured bandits, and extensive experiments demonstrate the consistent and robust performance of our method in practice across various settings.",
  },
  {
    slug: "2024_logarithmic_smoothing",
    pdf: "2024_logarithmic_smoothing.pdf",
    groupYear: "2024",
    citationDate: "2024",
    title:
      "Logarithmic Smoothing for Pessimistic Off-Policy Evaluation, Selection and Learning",
    authors: ["Otmane Sakhi", "Imad Aouali", "Pierre Alquier", "Nicolas Chopin"],
    venue: "NeurIPS 2024",
    citationVenue: "Advances in Neural Information Processing Systems 37",
    volume: "37",
    doi: "10.52202/079017-2566",
    arxivId: "2405.14335",
    externalUrl:
      "https://proceedings.neurips.cc/paper_files/paper/2024/hash/9379ea6ba7a61a402c7750833848b99f-Abstract-Conference.html",
    abstract:
      "This work investigates the offline formulation of the contextual bandit problem, where the goal is to leverage past interactions collected under a behavior policy to evaluate, select, and learn new, potentially better-performing policies. Motivated by critical applications, we move beyond point estimators. Instead, we adopt the principle of pessimism where we construct upper bounds that assess a policy's worst-case performance, enabling us to confidently select and learn improved policies. Precisely, we introduce novel, fully empirical concentration bounds for a broad class of importance weighting risk estimators. These bounds are general enough to cover most existing estimators and pave the way for the development of new ones. In particular, our pursuit of the tightest bound within this class motivates a novel estimator (LS), that logarithmically smooths large importance weights. The bound for LS is provably tighter than its competitors, and naturally results in improved policy selection and learning strategies. Extensive policy evaluation, selection, and learning experiments highlight the versatility and favorable performance of LS.",
  },
  {
    slug: "2024_unified_opl",
    pdf: "2024_unified_opl.pdf",
    groupYear: "2024",
    citationDate: "2024",
    title:
      "Unified PAC-Bayesian Study of Pessimism for Offline Policy Learning with Regularized Importance Sampling",
    authors: [
      "Imad Aouali",
      "Victor-Emmanuel Brunel",
      "David Rohde",
      "Anna Korba",
    ],
    venue: "UAI 2024",
    citationVenue:
      "Proceedings of the Fortieth Conference on Uncertainty in Artificial Intelligence",
    volume: "244",
    firstPage: "88",
    lastPage: "109",
    arxivId: "2406.03434",
    externalUrl: "https://proceedings.mlr.press/v244/aouali24a.html",
    abstract:
      "Off-policy learning (OPL) often involves minimizing a risk estimator based on importance weighting to correct bias from the logging policy used to collect data. However, this method can produce an estimator with a high variance. A common solution is to regularize the importance weights and learn the policy by minimizing an estimator with penalties derived from generalization bounds specific to the estimator. This approach, known as pessimism, has gained recent attention but lacks a unified framework for analysis. To address this gap, we introduce a comprehensive PAC-Bayesian framework to examine pessimism with regularized importance weighting. We derive a tractable PAC-Bayesian generalization bound that universally applies to common importance weight regularizations, enabling their comparison within a single framework. Our empirical results challenge common understanding, demonstrating the effectiveness of standard IW regularization techniques.",
  },
  {
    slug: "2023_linear_diffusion_ts",
    pdf: "2023_linear_diffusion_ts.pdf",
    groupYear: "2023",
    citationDate: "2023",
    title:
      "Linear Diffusion Models Meet Contextual Bandits with Large Action Spaces",
    authors: ["Imad Aouali"],
    venue: "Foundation Models for Decision Making Workshop at NeurIPS 2023",
    citationVenue:
      "Foundation Models for Decision Making Workshop at NeurIPS 2023",
    abstract:
      "Efficient exploration is a key challenge in contextual bandits due to the potentially large size of their action space, where uninformed exploration can result in computational and statistical inefficiencies. Fortunately, the rewards of actions are often correlated and this can be leveraged to explore them efficiently. In this work, we capture such correlations using pre-trained linear diffusion models, upon which we design diffusion Thompson sampling (dTS). Both theoretical and algorithmic foundations are developed for dTS, and empirical evaluation also shows its favorable performance.",
  },
  {
    slug: "2023_exponential_smoothing",
    pdf: "2023_exponential_smoothing.pdf",
    groupYear: "2023",
    citationDate: "2023",
    title: "Exponential Smoothing for Off-Policy Learning",
    authors: [
      "Imad Aouali",
      "Victor-Emmanuel Brunel",
      "David Rohde",
      "Anna Korba",
    ],
    venue: "ICML 2023",
    citationVenue:
      "Proceedings of the 40th International Conference on Machine Learning",
    volume: "202",
    firstPage: "984",
    lastPage: "1017",
    arxivId: "2305.15877",
    externalUrl: "https://proceedings.mlr.press/v202/aouali23a.html",
    abstract:
      "Off-policy learning (OPL) aims at finding improved policies from logged bandit data, often by minimizing the inverse propensity scoring (IPS) estimator of the risk. In this work, we investigate a smooth regularization for IPS, for which we derive a two-sided PAC-Bayes generalization bound. The bound is tractable, scalable, interpretable and provides learning certificates. In particular, it is also valid for standard IPS without making the assumption that the importance weights are bounded. We demonstrate the relevance of our approach and its favorable performance through a set of learning tasks. Since our bound holds for standard IPS, we are able to provide insight into when regularizing IPS is useful. Namely, we identify cases where regularization might not be needed. This goes against the belief that, in practice, clipped IPS often enjoys favorable performance than standard IPS in OPL.",
  },
  {
    slug: "2023_mixed_effect",
    pdf: "2023_mixed_effect.pdf",
    groupYear: "2023",
    citationDate: "2023",
    title: "Mixed-Effect Thompson Sampling",
    authors: ["Imad Aouali", "Branislav Kveton", "Sumeet Katariya"],
    venue: "AISTATS 2023",
    citationVenue:
      "Proceedings of The 26th International Conference on Artificial Intelligence and Statistics",
    volume: "206",
    firstPage: "2087",
    lastPage: "2115",
    arxivId: "2205.15124",
    externalUrl: "https://proceedings.mlr.press/v206/aouali23a.html",
    abstract:
      "A contextual bandit is a popular framework for online learning to act under uncertainty. In practice, the number of actions is huge and their expected rewards are correlated. In this work, we introduce a general framework for capturing such correlations through a mixed-effect model where actions are related through multiple shared effect parameters. To explore efficiently using this structure, we propose Mixed-Effect Thompson Sampling (meTS) and bound its Bayes regret. The regret bound has two terms, one for learning the action parameters and the other for learning the shared effect parameters. The terms reflect the structure of our model and the quality of priors. Our theoretical findings are validated empirically using both synthetic and real-world problems. We also propose numerous extensions of practical interest. While they do not come with guarantees, they perform well empirically and show the generality of the proposed framework.",
  },
  {
    slug: "2023_prr",
    pdf: "2023_prr.pdf",
    groupYear: "2023",
    citationDate: "2023",
    title: "Probabilistic Rank and Reward: A Scalable Model for Slate Recommendation",
    authors: [
      "Imad Aouali",
      "Achraf Ait Sidi Hammou",
      "Otmane Sakhi",
      "David Rohde",
      "Flavian Vasile",
    ],
    venue: "Preprint",
    citationVenue: "arXiv preprint",
    arxivId: "2208.06263",
    doi: "10.48550/arXiv.2208.06263",
    externalUrl: "https://arxiv.org/abs/2208.06263",
    abstract:
      "We introduce Probabilistic Rank and Reward (PRR), a scalable probabilistic model for personalized slate recommendation. Our approach allows off-policy estimation of the reward in the scenario where the user interacts with at most one item from a slate of K items. We show that the probability of a slate being successful can be learned efficiently by combining the reward, whether the user successfully interacted with the slate, and the rank, the item that was selected within the slate. PRR outperforms existing off-policy reward optimizing methods and is far more scalable to large action spaces. Moreover, PRR allows fast delivery of recommendations powered by maximum inner product search (MIPS), making it suitable in low latency domains such as computational advertising.",
  },
  {
    slug: "2022_reco_tutorial",
    pdf: "2022_reco_tutorial.pdf",
    groupYear: "2022",
    citationDate: "2022",
    title:
      "Reward Optimizing Recommendation using Deep Learning and Fast Maximum Inner Product Search",
    authors: [
      "Imad Aouali",
      "Amine Benhalloum",
      "Martin Bompaire",
      "Achraf Ait Sidi Hammou",
      "Sergey Ivanov",
      "Benjamin Heymann",
      "David Rohde",
      "Otmane Sakhi",
      "Flavian Vasile",
      "Maxime Vono",
    ],
    venue: "Tutorials at KDD 2022 and ECML 2022",
    citationVenue:
      "Proceedings of the 28th ACM SIGKDD Conference on Knowledge Discovery and Data Mining",
    firstPage: "4772",
    lastPage: "4773",
    doi: "10.1145/3534678.3542622",
    externalUrl: "https://doi.org/10.1145/3534678.3542622",
    abstract:
      "How can we build and optimize a recommender system that must rapidly fill slates of personalized recommendations? The combination of deep learning stacks with fast maximum inner product search (MIPS) algorithms has shown that it is possible to deploy flexible models in production that can rapidly deliver personalized recommendations to users. Albeit promising, this methodology is not sufficient to build a recommender system that maximizes the reward, such as the probability of click. This tutorial takes participants through the necessary steps to model the reward and directly optimize the reward of recommendation engines built upon fast search algorithms to produce high-performance reward-optimizing recommender systems.",
  },
  {
    slug: "2022_prr",
    pdf: "2022_prr.pdf",
    groupYear: "2022",
    citationDate: "2022",
    title: "Combining Reward and Rank Signals for Slate Recommendation",
    authors: [
      "Imad Aouali",
      "Sergey Ivanov",
      "Mike Gartrell",
      "David Rohde",
      "Flavian Vasile",
      "Victor Zaytsev",
      "Diego Legrand",
    ],
    venue: "BCIRWIS Workshop at KDD 2022",
    citationVenue:
      "KDD Workshop on Bayesian Causal Inference for Real World Interactive Systems",
    arxivId: "2107.12455",
    doi: "10.48550/arXiv.2107.12455",
    externalUrl: "https://arxiv.org/abs/2107.12455",
    abstract:
      "We consider the problem of slate recommendation, where the recommender system presents a user with a collection or slate composed of K recommended items at once. If the user finds the recommended items appealing then the user may click and the recommender system receives some feedback. Two pieces of information are available to the recommender system: was the slate clicked, the reward, and if the slate was clicked, which item was clicked, the rank. In this paper, we formulate several Bayesian models that incorporate the reward signal, the rank signal, or both, for non-personalized slate recommendation. In our experiments, we analyze performance gains of the full model and show that it achieves significantly lower error as the number of products in the catalog grows or as the slate size increases.",
  },
  {
    slug: "2022_offline_reco_eval",
    pdf: "2022_offline_reco_eval.pdf",
    groupYear: "2022",
    citationDate: "2022",
    title:
      "Offline Evaluation of Reward-Optimizing Recommender Systems: The Case of Simulation",
    authors: [
      "Imad Aouali",
      "Amine Benhalloum",
      "Martin Bompaire",
      "Benjamin Heymann",
      "Olivier Jeunen",
      "David Rohde",
      "Otmane Sakhi",
      "Flavian Vasile",
    ],
    venue: "SimuRec Workshop at RecSys 2022",
    citationVenue: "Workshop on Simulation Methods for Recommender Systems",
    arxivId: "2209.08642",
    doi: "10.48550/arXiv.2209.08642",
    externalUrl: "https://arxiv.org/abs/2209.08642",
    abstract:
      "Both in academic and industry-based research, online evaluation methods are seen as the golden standard for interactive applications like recommendation systems. Naturally, the reason for this is that we can directly measure utility metrics that rely on interventions, being the recommendations that are shown to users. Nevertheless, online evaluation methods are costly for a number of reasons, and a clear need remains for reliable offline evaluation procedures. In industry, offline metrics are often used as a first-line evaluation to generate promising candidate models to evaluate online. In academic work, limited access to online systems makes offline metrics the de facto approach to validating novel methods. Two classes of offline metrics exist: proxy-based methods and counterfactual methods. The first class is often poorly correlated with the online metrics we care about, and the latter class only provides theoretical guarantees under assumptions that cannot be fulfilled in real-world environments. Here, we make the case that simulation-based comparisons provide ways forward beyond offline metrics, and argue that they are a preferable means of evaluation.",
  },
];

const presentations = [
  {
    title: "Bayesian Off-Policy Evaluation and Learning for Large Action Spaces",
    href: "presentations/bayes_opl.pdf",
    description: "Bayesian approaches to off-policy evaluation and learning",
  },
  {
    title: "Diffusion Models Meet Bandits",
    href: "presentations/diffusion_meet_bandit.pdf",
    description: "Connecting diffusion models with contextual bandit algorithms",
  },
  {
    title: "Exponential Smoothing for Off-Policy Learning",
    href: "presentations/exp_smooting_opl.pdf",
    description: "Unified view of smoothing techniques in off-policy evaluation",
  },
  {
    title: "Mixed-Effect Thompson Sampling",
    href: "presentations/mixed_effect_ts.pdf",
    description: "Hierarchical modeling approaches for contextual bandits",
  },
  {
    title: "On-Policy and Off-Policy Learning for Large Action Spaces",
    href: "presentations/aouali_thesis.pdf",
    description: "Defense slides for Imad Aouali's thesis",
  },
];

const resources = [
  {
    title: "Bibliography of Contextual Bandits",
    href: "papers/offline_bandit_bibliography.pdf",
    description:
      "The bibliography section of Otmane Sakhi's thesis contains related work on contextual bandits.",
  },
];

function html(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function xml(value) {
  return html(value).replaceAll("'", "&apos;");
}

function urlFor(pathname) {
  return `${SITE_URL}/${pathname}`.replace(/\/$/, "/");
}

function paperUrl(paper) {
  return urlFor(`papers/${paper.slug}.html`);
}

function pdfUrl(paper) {
  return urlFor(`papers/${paper.pdf}`);
}

function meta(name, content) {
  if (!content) return "";
  return `  <meta name="${html(name)}" content="${html(content)}">\n`;
}

function jsonLd(data) {
  return JSON.stringify(data, null, 2).replaceAll("</", "<\\/");
}

function sharedHead({ title, description, canonical, extra = "" }) {
  return `<head>
  <meta charset="utf-8">
  <title>${html(title)}</title>
  <meta name="description" content="${html(description)}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="canonical" href="${html(canonical)}">
  <meta name="robots" content="index,follow">
  <link rel="stylesheet" href="${canonical.endsWith("/index.html") || canonical === SITE_URL + "/" ? "assets/site.css" : "../assets/site.css"}">
${extra}</head>`;
}

function renderCitationMeta(paper) {
  let out = "";
  out += meta("citation_title", paper.title);
  for (const author of paper.authors) {
    out += meta("citation_author", author);
  }
  out += meta("citation_publication_date", paper.citationDate);
  out += meta("citation_conference_title", paper.citationVenue);
  out += meta("citation_volume", paper.volume);
  out += meta("citation_firstpage", paper.firstPage);
  out += meta("citation_lastpage", paper.lastPage);
  out += meta("citation_pdf_url", pdfUrl(paper));
  out += meta("citation_doi", paper.doi);
  out += meta("citation_arxiv_id", paper.arxivId);
  return out;
}

function renderPaperSchema(paper) {
  const sameAs = [
    ...new Set(
      [
        paper.externalUrl,
        paper.arxivId ? `https://arxiv.org/abs/${paper.arxivId}` : "",
      ].filter(Boolean)
    ),
  ];
  const identifiers = [
    paper.doi ? `doi:${paper.doi}` : "",
    paper.arxivId ? `arXiv:${paper.arxivId}` : "",
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: paper.title,
    name: paper.title,
    author: paper.authors.map((name) => ({ "@type": "Person", name })),
    datePublished: paper.citationDate,
    abstract: paper.abstract,
    isPartOf: paper.citationVenue
      ? {
          "@type": "CreativeWork",
          name: paper.citationVenue,
          volumeNumber: paper.volume,
        }
      : undefined,
    pagination:
      paper.firstPage && paper.lastPage
        ? `${paper.firstPage}-${paper.lastPage}`
        : undefined,
    identifier: identifiers.length ? identifiers : undefined,
    url: paperUrl(paper),
    sameAs: sameAs.length ? sameAs : undefined,
    encoding: {
      "@type": "MediaObject",
      contentUrl: pdfUrl(paper),
      encodingFormat: "application/pdf",
    },
  };
}

function renderIndexSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Publications of Imad Aouali",
    url: `${SITE_URL}/`,
    about: {
      "@type": "Person",
      name: "Imad Aouali",
      url: "https://iaouali.com",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: papers.map((paper, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: paperUrl(paper),
        name: paper.title,
      })),
    },
  };
}

function paperCard(paper) {
  return `<li class="paper-item">
        <span class="year">${html(paper.groupYear)}</span>
        <div class="paper-main">
          <h3><a href="papers/${html(paper.slug)}.html">${html(paper.title)}</a></h3>
          <p class="authors">${html(paper.authors.join(", "))}</p>
          <p class="venue">${html(paper.venue)}</p>
          <p class="links"><a href="papers/${html(paper.slug)}.html">Paper page</a><a href="papers/${html(paper.pdf)}">PDF</a>${paper.externalUrl ? `<a href="${html(paper.externalUrl)}">Record</a>` : ""}</p>
        </div>
      </li>`;
}

function resourceCard(item) {
  return `<li class="paper-item compact">
        <span class="year">PDF</span>
        <div class="paper-main">
          <h3><a href="${html(item.href)}">${html(item.title)}</a></h3>
          <p class="venue">${html(item.description)}</p>
        </div>
      </li>`;
}

function renderIndex() {
  const grouped = new Map();
  for (const paper of papers) {
    if (!grouped.has(paper.groupYear)) grouped.set(paper.groupYear, []);
    grouped.get(paper.groupYear).push(paper);
  }

  const sections = [...grouped.entries()]
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(
      ([year, items]) => `<section id="year-${html(year)}">
    <h2>${html(year)}</h2>
    <ul class="paper-list">
      ${items.map(paperCard).join("\n      ")}
    </ul>
  </section>`
    )
    .join("\n\n  ");

  return `<!DOCTYPE html>
<html lang="en">
${sharedHead({
    title: "Publications of Imad Aouali",
    description:
      "Publications, abstracts, and PDFs by Imad Aouali in bandits, off-policy learning, recommender systems, and generative models.",
    canonical: `${SITE_URL}/`,
    extra: `  <script type="application/ld+json">${jsonLd(renderIndexSchema())}</script>\n`,
  })}
<body>
  <main class="wrap">
    <header class="site-header">
      <p class="eyebrow">Imad Aouali</p>
      <h1>Publications</h1>
      <p class="sub">Research papers, abstracts, and PDFs on contextual bandits, off-policy learning, recommender systems, and generative models.</p>
      <nav class="nav-links" aria-label="Primary">
        <a href="#papers">Papers</a>
        <a href="#presentations">Presentations</a>
        <a href="https://iaouali.com">Main website</a>
      </nav>
    </header>

    <div id="papers"></div>
  ${sections}

    <section id="presentations">
      <h2>Presentations</h2>
      <ul class="paper-list">
        ${presentations.map(resourceCard).join("\n        ")}
      </ul>
    </section>

    <section id="resources">
      <h2>Resources</h2>
      <ul class="paper-list">
        ${resources.map(resourceCard).join("\n        ")}
      </ul>
    </section>

    <footer>
      <p>Full personal website: <a href="https://iaouali.com">iaouali.com</a>.</p>
    </footer>
  </main>
</body>
</html>
`;
}

function renderPaperPage(paper) {
  const description = `${paper.title} by ${paper.authors.join(", ")}. ${paper.venue}.`;
  const extra = `${renderCitationMeta(paper)}  <script type="application/ld+json">${jsonLd(renderPaperSchema(paper))}</script>\n`;
  return `<!DOCTYPE html>
<html lang="en">
${sharedHead({
    title: `${paper.title} | Imad Aouali Publications`,
    description,
    canonical: paperUrl(paper),
    extra,
  })}
<body>
  <main class="wrap paper-page">
    <header class="site-header paper-header">
      <a class="back-link" href="../index.html">Publications</a>
      <p class="eyebrow">${html(paper.venue)}</p>
      <h1 class="citation_title">${html(paper.title)}</h1>
      <p class="authors citation_author">${html(paper.authors.join(", "))}</p>
      <div class="paper-actions">
        <a class="button" href="${html(paper.pdf)}">Download PDF</a>
        ${paper.externalUrl ? `<a class="button secondary" href="${html(paper.externalUrl)}">External record</a>` : ""}
      </div>
    </header>

    <section>
      <h2>Abstract</h2>
      <p>${html(paper.abstract)}</p>
    </section>

    <section>
      <h2>Citation</h2>
      <dl class="metadata">
        <div><dt>Authors</dt><dd>${html(paper.authors.join(", "))}</dd></div>
        <div><dt>Venue</dt><dd>${html(paper.citationVenue || paper.venue)}</dd></div>
        <div><dt>Year</dt><dd>${html(paper.citationDate)}</dd></div>
        ${paper.volume ? `<div><dt>Volume</dt><dd>${html(paper.volume)}</dd></div>` : ""}
        ${paper.firstPage && paper.lastPage ? `<div><dt>Pages</dt><dd>${html(paper.firstPage)}-${html(paper.lastPage)}</dd></div>` : ""}
        ${paper.doi ? `<div><dt>DOI</dt><dd><a href="https://doi.org/${html(paper.doi)}">${html(paper.doi)}</a></dd></div>` : ""}
        ${paper.arxivId ? `<div><dt>arXiv</dt><dd><a href="https://arxiv.org/abs/${html(paper.arxivId)}">${html(paper.arxivId)}</a></dd></div>` : ""}
      </dl>
    </section>

    <footer>
      <p><a href="../index.html">Back to all publications</a></p>
    </footer>
  </main>
</body>
</html>
`;
}

function renderSitemap() {
  const urls = [
    { loc: `${SITE_URL}/`, lastmod: UPDATED },
    ...papers.map((paper) => ({ loc: paperUrl(paper), lastmod: UPDATED })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `  <url>
    <loc>${xml(item.loc)}</loc>${item.lastmod ? `\n    <lastmod>${xml(item.lastmod)}</lastmod>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>
`;
}

function renderCss() {
  return `:root {
  --bg: #fbfbfc;
  --fg: #121417;
  --muted: #57606a;
  --link: #0b5cad;
  --surface: #ffffff;
  --surface-soft: #f2f5f8;
  --border: #d7dde5;
  --accent: #9b3a38;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #101214;
    --fg: #e9edf1;
    --muted: #a5adb7;
    --link: #7db8ff;
    --surface: #171b20;
    --surface-soft: #20262d;
    --border: #313943;
    --accent: #ef9b79;
  }
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  background: var(--bg);
  color: var(--fg);
  font: 16px/1.65 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

a {
  color: var(--link);
  text-decoration: none;
}

a:hover,
a:focus {
  text-decoration: underline;
}

.wrap {
  max-width: 980px;
  margin: 0 auto;
  padding: 44px 18px 28px;
}

.site-header {
  margin-bottom: 34px;
}

.paper-header {
  margin-bottom: 28px;
}

.eyebrow {
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  margin: 0 0 8px;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
  margin: 0 0 12px;
}

.paper-page h1 {
  max-width: 880px;
}

h2 {
  border-top: 1px solid var(--border);
  font-size: 1.35rem;
  line-height: 1.25;
  margin: 34px 0 14px;
  padding-top: 24px;
}

h3 {
  font-size: 1.02rem;
  line-height: 1.35;
  margin: 0 0 4px;
}

.sub,
.authors,
.venue,
footer {
  color: var(--muted);
}

.sub {
  max-width: 760px;
  margin: 0 0 20px;
}

.nav-links,
.links,
.paper-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.nav-links a,
.links a,
.button {
  border: 1px solid var(--border);
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 6px 10px;
}

.button {
  background: var(--fg);
  border-color: var(--fg);
  color: var(--bg);
  font-weight: 650;
}

.button.secondary {
  background: transparent;
  border-color: var(--border);
  color: var(--link);
}

.paper-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.paper-item {
  align-items: flex-start;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  display: grid;
  gap: 16px;
  grid-template-columns: 4rem 1fr;
  margin: 10px 0;
  padding: 15px 16px;
}

.paper-item.compact {
  grid-template-columns: 4rem 1fr;
}

.year {
  color: var(--muted);
  font-weight: 700;
}

.authors,
.venue,
.links {
  margin: 0;
}

.links {
  margin-top: 10px;
}

.links a {
  background: var(--surface-soft);
  font-size: 0.9rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 18px;
}

.metadata {
  display: grid;
  gap: 10px;
  margin: 0;
}

.metadata div {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  display: grid;
  gap: 8px;
  grid-template-columns: 8rem 1fr;
  padding: 12px 14px;
}

.metadata dt {
  color: var(--muted);
  font-weight: 700;
}

.metadata dd {
  margin: 0;
}

footer {
  margin-top: 32px;
  font-size: 0.95rem;
}

@media (max-width: 640px) {
  .wrap {
    padding-top: 28px;
  }

  .paper-item,
  .metadata div {
    grid-template-columns: 1fr;
  }

  .year {
    margin-bottom: -8px;
  }
}
`;
}

function writeFile(filePath, contents) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents);
}

writeFile("index.html", renderIndex());
writeFile("sitemap.xml", renderSitemap());
writeFile(
  "robots.txt",
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
);
writeFile("assets/site.css", renderCss());

for (const paper of papers) {
  writeFile(path.join("papers", `${paper.slug}.html`), renderPaperPage(paper));
}

console.log(`Generated ${papers.length} paper pages, index.html, sitemap.xml, robots.txt, and assets/site.css.`);
