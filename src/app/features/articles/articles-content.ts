import { Lang } from '../../core/i18n/translations';

export type ArticleSlug =
  | 'vision'
  | 'modele'
  | 'infrastructures'
  | 'alimentation'
  | 'mobilite'
  | 'gestion'
  | 'emploi'
  | 'integrite';

export const ARTICLE_ORDER: ArticleSlug[] = ["vision","modele","infrastructures","alimentation","mobilite","gestion","emploi","integrite"];

export interface ArticleLang {
  title: string;
  lead: string;
  brief: string[];
  bodyHtml: string;
}

export interface Article {
  slug: ArticleSlug;
  tag: { fr: string; en: string };
  fr: ArticleLang;
  en: ArticleLang;
}

export const ARTICLES: Record<ArticleSlug, Article> = {
  'vision': {
    slug: 'vision',
    tag: { fr: "Notre vision", en: "Our vision" },
    fr: {
      title: "Là où nous allons, c'est loin.",
      lead: "KWAAA Group est né d'une conviction : la jeunesse africaine peut bâtir elle-même les entreprises dont le continent a besoin, et les faire durer.",
      brief: ["Un groupe congolais fondé en mai 2025, pensé dès le départ pour le continent.","Un nom qui transforme le doute des autres en moteur.","Une ambition de long terme, conduite avec méthode."],
      bodyHtml: `<h3>Le point de départ</h3>
<p>Le Congo dispose de ressources, de terres et d'une jeunesse nombreuse. Pourtant, une grande partie de ce qui se construit, se mange ou s'organise dans le pays dépend encore d'acteurs extérieurs. Les jeunes diplômés, eux, cherchent des entreprises sérieuses où apprendre, grandir et prendre des responsabilités.</p>
<p>Nous avons créé KWAAA Group pour répondre à ces deux réalités à la fois : construire des entreprises congolaises solides, et ouvrir la voie à une génération qui veut bâtir chez elle.</p>
<h3>Un nom né du doute des autres</h3>
<p>Quand une ambition paraît démesurée, on l'entend vite : « Quoi ? Vous pensez vraiment construire ça ? Quoi ? Vous pensez pouvoir faire ça ? » Derrière cette question, il y a souvent de la moquerie, ou les barrières que chacun finit par se fixer.</p>
<p>Nous avons choisi d'en faire notre nom. KWAAA, prononcé « quoi », transforme ce doute en point de départ. Ces limites ne nous concernent pas : nous les changeons, projet après projet.</p>
<blockquote>« Là où nous allons, c'est loin. » Ce n'est pas un slogan, c'est un horizon de travail.</blockquote>
<h3>Le Congo d'abord, l'Afrique ensuite</h3>
<p>Notre siège est en RDC, et c'est là que nous faisons nos preuves. Mais nos métiers répondent à des besoins que partagent de nombreux pays du continent : se loger, se nourrir, se déplacer, se rencontrer, mieux gérer ses organisations. Chaque projet réussi au Congo est une référence que nous pourrons porter ailleurs.</p>
<h3>L'audace, avec méthode</h3>
<p>Nous assumons d'être jeunes et ambitieux. Mais l'ambition sans rigueur ne construit rien de durable. C'est pourquoi le groupe s'est doté, dès sa création, de procédures écrites, d'un outil de gestion financière unique et d'une gouvernance claire entre associés.</p>
<h3>Ce que nous voulons prouver</h3>
<ul><li>Qu'une entreprise africaine peut être exigeante, transparente et compétitive.</li><li>Que la jeunesse peut diriger, et pas seulement exécuter.</li><li>Qu'un groupe peut naître dans l'est du Congo et rayonner sur le continent.</li></ul>
<h3>Notre horizon</h3>
<p>À terme, chacune de nos quatre branches deviendra une entreprise à part entière, avec ses équipes, ses clients et ses résultats propres, reliée aux autres au sein du groupe. C'est ce chemin que nous appelons « loin ».</p>`
    },
    en: {
      title: "Where we are going is far.",
      lead: "KWAAA Group was born from one conviction: African youth can build the companies the continent needs, and make them last.",
      brief: ["A Congolese group founded in May 2025, designed for the continent from day one.","A name that turns other people's doubt into drive.","A long-term ambition, pursued with method."],
      bodyHtml: `<h3>Where it starts</h3>
<p>Congo has resources, land and a large young population. Yet much of what is built, eaten or organised in the country still depends on outside players. Young graduates, meanwhile, are looking for serious companies where they can learn, grow and take on responsibility.</p>
<p>We created KWAAA Group to answer both realities: build strong Congolese companies, and open the way for a generation that wants to build at home.</p>
<h3>A name born from other people's doubt</h3>
<p>When an ambition looks out of proportion, you hear it quickly: “What? You really think you can build that? What? You think you can do that?” Behind the question there is often mockery, or the barriers people end up setting for themselves.</p>
<p>We chose to make it our name. KWAAA, pronounced like French “quoi” (“what”), turns that doubt into a starting point. Those limits do not apply to us: we change them, one project at a time.</p>
<blockquote>“Where we are going is far.” Not a slogan, but a working horizon.</blockquote>
<h3>Congo first, then Africa</h3>
<p>Our head office is in the DRC, and that is where we prove ourselves. But our businesses meet needs shared by many countries on the continent: housing, food, mobility, gatherings, better-run organisations. Every successful project in Congo is a reference we can take elsewhere.</p>
<h3>Boldness, with method</h3>
<p>We are young and ambitious, and we own it. But ambition without rigour builds nothing lasting. That is why the group set up, from day one, written procedures, a single financial management tool and clear governance between partners.</p>
<h3>What we want to prove</h3>
<ul><li>That an African company can be demanding, transparent and competitive.</li><li>That young people can lead, not just execute.</li><li>That a group can be born in eastern Congo and reach across the continent.</li></ul>
<h3>Our horizon</h3>
<p>In time, each of our four branches will become a company in its own right, with its own teams, clients and results, connected to the others within the group. That path is what we call “far”.</p>`
    },
  },
  'modele': {
    slug: 'modele',
    tag: { fr: "Notre modèle", en: "Our model" },
    fr: {
      title: "Quatre métiers, une direction, un cercle.",
      lead: "Construction, Agro, Event & Logistique, Communication & Consulting : quatre branches pilotées ensemble, qui se renforcent les unes les autres.",
      brief: ["Un seul interlocuteur pour des projets qui mobilisent plusieurs métiers.","Une valeur créée par une branche, réutilisée par une autre.","Des branches appelées à devenir des entreprises autonomes."],
      bodyHtml: `<h3>Pourquoi un groupe plutôt qu'une entreprise spécialisée</h3>
<p>Au Congo, un projet a rarement besoin d'un seul métier. Ouvrir une ferme, c'est construire des bâtiments, transporter des intrants, recruter, vendre et communiquer. Organiser un grand événement, c'est trouver un lieu, nourrir des invités, déplacer des personnes et attirer un public. Chaque intermédiaire supplémentaire ajoute des coûts, des délais et des risques.</p>
<p>Notre réponse : réunir ces compétences sous une même direction, avec les mêmes standards, pour livrer des projets complets.</p>
<h3>La circularité, notre logique économique</h3>
<p>Ce qu'une branche produit, une autre l'utilise. C'est notre valeur de circularité, et c'est aussi notre avantage compétitif.</p>
<ul><li><strong>Construction → Agro :</strong> entrepôts, bâtiments d'élevage, unités de transformation.</li><li><strong>Agro → Event :</strong> restauration des événements à partir de produits locaux.</li><li><strong>Logistique → toutes les branches :</strong> transport des matériaux, des récoltes, du matériel et des équipes.</li><li><strong>Consulting → toutes les branches :</strong> marketing, finance, recrutement et organisation.</li></ul>
<p>Cette chaîne interne réduit nos coûts, sécurise nos délais et garde la valeur ajoutée au sein du groupe, donc dans l'économie locale.</p>
<blockquote>Un client, un interlocuteur, quatre métiers mobilisés.</blockquote>
<h3>Ce que cela change pour nos clients</h3>
<p>Un client qui nous confie un projet n'a pas à coordonner plusieurs prestataires. Nous planifions l'ensemble, nous assumons la responsabilité du résultat et nous rendons compte à un seul endroit.</p>
<h3>Une direction, des règles communes</h3>
<p>Les quatre branches partagent aujourd'hui une même direction, les mêmes procédures et un outil de gestion unique. Les décisions importantes sont prises par les associés. Les désaccords sérieux sont tranchés en assemblée générale. Cette discipline commune permet de grandir vite sans perdre le contrôle.</p>
<h3>Demain : un groupe d'entreprises</h3>
<p>Notre modèle est pensé pour évoluer. Chaque branche est appelée à devenir une entreprise à part entière, avec sa propre équipe dirigeante, tout en restant reliée au groupe et à sa logique circulaire. Nos statuts ont été rédigés pour permettre cette évolution.</p>`
    },
    en: {
      title: "Four businesses, one leadership, one circle.",
      lead: "Construction, Agro, Events & Logistics, Communication & Consulting: four branches run together, each strengthening the others.",
      brief: ["One point of contact for projects that need several trades.","Value created by one branch, reused by another.","Branches designed to become independent companies."],
      bodyHtml: `<h3>Why a group rather than a specialised company</h3>
<p>In Congo, a project rarely needs a single trade. Opening a farm means putting up buildings, moving inputs, hiring, selling and communicating. Running a large event means finding a venue, feeding guests, moving people and drawing an audience. Every extra intermediary adds cost, delay and risk.</p>
<p>Our answer: bring these skills together under one leadership, with the same standards, to deliver complete projects.</p>
<h3>Circularity, our economic logic</h3>
<p>What one branch produces, another uses. That is our value of circularity, and it is also our competitive edge.</p>
<ul><li><strong>Construction → Agro:</strong> warehouses, livestock buildings, processing units.</li><li><strong>Agro → Events:</strong> event catering with local produce.</li><li><strong>Logistics → every branch:</strong> moving materials, harvests, equipment and teams.</li><li><strong>Consulting → every branch:</strong> marketing, finance, recruitment and organisation.</li></ul>
<p>This internal chain lowers our costs, secures our deadlines and keeps the added value inside the group, and therefore in the local economy.</p>
<blockquote>One client, one point of contact, four businesses at work.</blockquote>
<h3>What it changes for our clients</h3>
<p>A client who trusts us with a project does not have to coordinate several providers. We plan the whole, take responsibility for the result and report in one place.</p>
<h3>One leadership, shared rules</h3>
<p>The four branches currently share one leadership, the same procedures and a single management tool. Major decisions are taken by the partners. Serious disagreements are settled by the general assembly. This shared discipline lets us grow fast without losing control.</p>
<h3>Tomorrow: a group of companies</h3>
<p>Our model is built to evolve. Each branch is meant to become a company in its own right, with its own leadership team, while staying connected to the group and its circular logic. Our articles of association were written to allow it.</p>`
    },
  },
  'infrastructures': {
    slug: 'infrastructures',
    tag: { fr: "Construction", en: "Construction" },
    fr: {
      title: "Des infrastructures solides.",
      lead: "Les villes congolaises grandissent vite. Elles ont besoin de logements, de bâtiments et de routes construits pour durer, à un coût maîtrisé.",
      brief: ["De la production de matériaux à la livraison de l'ouvrage.","Qualité contrôlée, délais tenus, coûts transparents.","Le socle physique des autres branches du groupe."],
      bodyHtml: `<h3>Le constat</h3>
<p>La demande en logements, en bâtiments commerciaux et en voirie progresse avec la croissance des villes. Trop souvent, les chantiers souffrent de matériaux de qualité inégale, de délais qui glissent et de devis qui changent en cours de route. Le client paie la différence.</p>
<h3>Notre approche : maîtriser toute la chaîne</h3>
<p>Notre branche Construction couvre l'ensemble du cycle : la production de matériaux, la construction et le suivi des ouvrages. Produire nous-mêmes une partie de nos matériaux nous permet de contrôler la qualité à la source, de réduire notre dépendance aux fournisseurs et de garder la valeur ajoutée sur place.</p>
<h3>Ce que nous proposons</h3>
<ul><li><strong>Matériaux de construction</strong> pour nos chantiers et pour nos clients.</li><li><strong>Maisons d'habitation</strong>, de la conception à la remise des clés.</li><li><strong>Bâtiments</strong> commerciaux, agricoles et institutionnels.</li><li><strong>Routes et aménagements</strong> pour relier les quartiers, les zones de production et les marchés.</li></ul>
<blockquote>Un ouvrage bien construit est un actif pour des générations. Un ouvrage mal construit est une dette.</blockquote>
<h3>Comment nous travaillons</h3>
<ul><li>Un devis détaillé, poste par poste, avant le démarrage.</li><li>Un planning partagé avec le client et suivi dans notre outil de gestion.</li><li>Des contrôles de qualité aux étapes clés du chantier.</li><li>Une main-d'œuvre recrutée en priorité là où nous construisons.</li></ul>
<h3>Le socle du groupe</h3>
<p>La Construction bâtit aussi les infrastructures dont les autres branches ont besoin : entrepôts et bâtiments d'élevage pour l'Agro, espaces pour les événements, dépôts pour la Logistique. Chaque chantier interne renforce notre savoir-faire et notre capacité.</p>
<h3>Ce que nous voulons changer</h3>
<p>Nous voulons qu'au Congo, faire construire redevienne un projet serein : un prix connu, un délai tenu, un ouvrage qui dure. C'est ainsi que se bâtissent la confiance et les villes de demain.</p>`
    },
    en: {
      title: "Solid infrastructure.",
      lead: "Congolese cities are growing fast. They need homes, buildings and roads built to last, at a controlled cost.",
      brief: ["From making materials to handing over the finished work.","Controlled quality, deadlines met, transparent costs.","The physical foundation for the group's other branches."],
      bodyHtml: `<h3>The situation</h3>
<p>Demand for housing, commercial buildings and roads rises with urban growth. Too often, sites suffer from uneven material quality, slipping deadlines and quotes that change along the way. The client pays the difference.</p>
<h3>Our approach: control the whole chain</h3>
<p>Our Construction branch covers the entire cycle: producing materials, building and following up on the works. Making part of our materials ourselves lets us control quality at the source, depend less on suppliers and keep the added value local.</p>
<h3>What we offer</h3>
<ul><li><strong>Building materials</strong> for our own sites and for clients.</li><li><strong>Houses</strong>, from design to handover.</li><li><strong>Buildings</strong>: commercial, agricultural and institutional.</li><li><strong>Roads and site works</strong> to connect neighbourhoods, production areas and markets.</li></ul>
<blockquote>A well-built structure is an asset for generations. A badly built one is a debt.</blockquote>
<h3>How we work</h3>
<ul><li>A detailed, line-by-line quote before work starts.</li><li>A schedule shared with the client and tracked in our management tool.</li><li>Quality checks at key stages of the site.</li><li>A workforce recruited first where we build.</li></ul>
<h3>The group's foundation</h3>
<p>Construction also builds the infrastructure the other branches need: warehouses and livestock buildings for Agro, spaces for events, depots for Logistics. Every internal project strengthens our know-how and capacity.</p>
<h3>What we want to change</h3>
<p>We want building in Congo to become a calm undertaking again: a known price, a deadline met, a structure that lasts. That is how trust, and tomorrow's cities, are built.</p>`
    },
  },
  'alimentation': {
    slug: 'alimentation',
    tag: { fr: "Agro", en: "Agro" },
    fr: {
      title: "La sécurité alimentaire.",
      lead: "Le Congo a les terres pour nourrir sa population et bien au-delà. Ce qui manque, ce sont des chaînes complètes et fiables, du champ à l'assiette.",
      brief: ["Agriculture, élevage, transformation et restauration réunis.","Produire et transformer sur place pour moins importer.","Une chaîne de valeur qui crée des emplois à chaque étape."],
      bodyHtml: `<h3>Le constat</h3>
<p>Le potentiel agricole du pays est immense, mais une part importante des produits consommés dans les villes reste importée ou perdue faute de stockage, de transformation et de transport. Les producteurs vendent souvent bruts et à bas prix. Les consommateurs paient cher des produits venus de loin.</p>
<h3>Notre approche : une chaîne de valeur intégrée</h3>
<p>Notre branche Agro ne se limite pas à produire. Elle relie toutes les étapes, pour que la valeur créée reste dans la région où elle est produite.</p>
<ul><li><strong>Agriculture :</strong> des cultures choisies pour leur demande réelle sur le marché.</li><li><strong>Élevage :</strong> une production animale suivie et organisée.</li><li><strong>Transformation :</strong> conserver, conditionner et valoriser les récoltes.</li><li><strong>Restauration :</strong> servir des produits locaux, notamment lors des événements du groupe.</li></ul>
<blockquote>Chaque produit transformé sur place, ce sont des emplois et de la valeur qui restent au pays.</blockquote>
<h3>La force du groupe</h3>
<p>L'Agro s'appuie directement sur les autres branches. La Construction bâtit ses entrepôts, ses bâtiments d'élevage et ses unités de transformation. La Logistique achemine les intrants et les récoltes. Le Consulting structure la commercialisation et la gestion. Event & Logistique lui ouvre un débouché naturel avec la restauration.</p>
<h3>Ce que nous voulons changer</h3>
<ul><li>Réduire la dépendance aux produits importés.</li><li>Mieux rémunérer la production locale grâce à la transformation.</li><li>Rendre l'alimentation plus disponible et plus stable pour les familles.</li><li>Montrer que l'agriculture peut être un secteur moderne et attractif pour les jeunes.</li></ul>
<h3>Notre horizon</h3>
<p>Construire, étape par étape, une branche agro-industrielle capable d'approvisionner durablement les villes congolaises, puis d'autres marchés du continent.</p>`
    },
    en: {
      title: "Food security.",
      lead: "Congo has the land to feed its population and far beyond. What is missing are complete, reliable chains, from field to plate.",
      brief: ["Farming, livestock, processing and catering brought together.","Produce and process locally to import less.","A value chain that creates jobs at every stage."],
      bodyHtml: `<h3>The situation</h3>
<p>The country's agricultural potential is immense, yet a large share of what cities consume is imported, or lost for lack of storage, processing and transport. Producers often sell raw and cheap. Consumers pay a high price for goods from far away.</p>
<h3>Our approach: an integrated value chain</h3>
<p>Our Agro branch does more than produce. It connects every stage, so that the value created stays in the region where it is produced.</p>
<ul><li><strong>Farming:</strong> crops chosen for real market demand.</li><li><strong>Livestock:</strong> organised, monitored animal production.</li><li><strong>Processing:</strong> preserving, packaging and adding value to harvests.</li><li><strong>Catering:</strong> serving local produce, including at the group's events.</li></ul>
<blockquote>Every product processed locally means jobs and value that stay in the country.</blockquote>
<h3>The strength of the group</h3>
<p>Agro relies directly on the other branches. Construction builds its warehouses, livestock buildings and processing units. Logistics moves inputs and harvests. Consulting structures sales and management. Events & Logistics gives it a natural outlet through catering.</p>
<h3>What we want to change</h3>
<ul><li>Reduce dependence on imported products.</li><li>Pay local production better through processing.</li><li>Make food more available and more stable for families.</li><li>Show that farming can be a modern, attractive sector for young people.</li></ul>
<h3>Our horizon</h3>
<p>Build, step by step, an agribusiness branch able to supply Congolese cities sustainably, and then other markets on the continent.</p>`
    },
  },
  'mobilite': {
    slug: 'mobilite',
    tag: { fr: "Event & Logistique", en: "Events & Logistics" },
    fr: {
      title: "Relier les personnes et les marchés.",
      lead: "Un pays grand comme le Congo vit de ce qui circule : les personnes, les marchandises et les idées. Notre branche organise ces flux.",
      brief: ["Événements, tourisme, billetterie et transport.","Une organisation fiable, du premier contact au dernier invité.","Le système circulatoire du groupe."],
      bodyHtml: `<h3>Le constat</h3>
<p>Déplacer des marchandises, acheminer du matériel ou organiser un événement d'envergure reste un défi : coûts élevés, délais imprévisibles, prestataires difficiles à coordonner. Pourtant, c'est en circulant que l'économie se développe, que les marchés se connectent et que les talents se rencontrent.</p>
<h3>Ce que nous proposons</h3>
<ul><li><strong>Événementiel :</strong> conception et organisation d'événements professionnels, culturels et privés.</li><li><strong>Tourisme :</strong> faire découvrir le pays et ses richesses, de façon organisée et sûre.</li><li><strong>Billetterie :</strong> gestion des accès et des ventes pour les événements et les déplacements.</li><li><strong>Transport :</strong> déplacement de personnes et de marchandises.</li></ul>
<blockquote>Un bon événement se voit le jour J. Il se gagne pendant les semaines de préparation.</blockquote>
<h3>Notre méthode</h3>
<p>Un interlocuteur unique, un rétroplanning partagé, un budget détaillé et un suivi rigoureux de chaque prestation. Grâce au groupe, nous mobilisons en interne la restauration (Agro), l'aménagement des espaces (Construction) et la promotion (Communication & Consulting).</p>
<h3>Le système circulatoire du groupe</h3>
<p>La Logistique est le lien entre nos branches. Elle transporte les matériaux vers les chantiers, les récoltes vers les marchés et les équipes vers les projets. Sans elle, la circularité du groupe ne serait qu'une idée.</p>
<h3>Ce que nous voulons changer</h3>
<ul><li>Rendre le transport plus fiable et plus prévisible pour les entreprises.</li><li>Faire des événements organisés au Congo des références de qualité.</li><li>Valoriser le potentiel touristique du pays.</li><li>Rapprocher les producteurs de leurs marchés.</li></ul>`
    },
    en: {
      title: "Connecting people and markets.",
      lead: "A country as large as Congo lives on what moves: people, goods and ideas. Our branch organises those flows.",
      brief: ["Events, tourism, ticketing and transport.","Reliable organisation, from first contact to last guest.","The group's circulatory system."],
      bodyHtml: `<h3>The situation</h3>
<p>Moving goods, shipping equipment or running a large event remains a challenge: high costs, unpredictable delays, providers that are hard to coordinate. Yet it is by moving that the economy grows, markets connect and talent meets.</p>
<h3>What we offer</h3>
<ul><li><strong>Events:</strong> designing and running professional, cultural and private events.</li><li><strong>Tourism:</strong> showing the country and its riches, in an organised and safe way.</li><li><strong>Ticketing:</strong> managing access and sales for events and travel.</li><li><strong>Transport:</strong> moving people and goods.</li></ul>
<blockquote>A good event shows on the day. It is won in the weeks of preparation.</blockquote>
<h3>Our method</h3>
<p>A single point of contact, a shared schedule, a detailed budget and rigorous follow-up of every service. Thanks to the group, we bring in catering (Agro), venue fit-out (Construction) and promotion (Communication & Consulting) in-house.</p>
<h3>The group's circulatory system</h3>
<p>Logistics is the link between our branches. It carries materials to sites, harvests to markets and teams to projects. Without it, the group's circularity would remain an idea.</p>
<h3>What we want to change</h3>
<ul><li>Make transport more reliable and predictable for businesses.</li><li>Make events held in Congo benchmarks of quality.</li><li>Showcase the country's tourism potential.</li><li>Bring producers closer to their markets.</li></ul>`
    },
  },
  'gestion': {
    slug: 'gestion',
    tag: { fr: "Communication & Consulting", en: "Communication & Consulting" },
    fr: {
      title: "Des entreprises mieux gérées.",
      lead: "Beaucoup d'organisations ont un bon produit ou une belle mission, mais manquent de visibilité, de méthode financière ou d'organisation. Nous les aidons à franchir ce cap.",
      brief: ["Communication, marketing, finance et ressources humaines.","Des méthodes que nous appliquons d'abord à nous-mêmes.","Le cerveau stratégique du groupe."],
      bodyHtml: `<h3>Le constat</h3>
<p>De nombreuses PME, associations et institutions ont du potentiel, mais grandissent moins vite qu'elles le pourraient. Leur marque est peu connue, leurs ventes reposent sur quelques personnes, leurs comptes sont difficiles à lire et leurs recrutements se font dans l'urgence.</p>
<h3>Nos domaines d'intervention</h3>
<ul><li><strong>Communication :</strong> identité de marque, messages, supports et présence en ligne.</li><li><strong>Marketing et ventes :</strong> stratégie commerciale, offres, prospection et suivi des clients.</li><li><strong>Finance et gestion :</strong> organisation comptable, tableaux de bord, procédures et contrôle.</li><li><strong>Ressources humaines :</strong> définition des postes, recrutement au mérite, organisation des équipes.</li></ul>
<blockquote>Ce que nous conseillons à nos clients, nous le pratiquons d'abord chez nous.</blockquote>
<h3>Notre crédibilité : notre propre organisation</h3>
<p>KWAAA Group gère ses finances dans un outil de gestion développé par sa propre équipe, et met progressivement ses procédures en conformité avec le référentiel comptable OHADA. Nous recrutons sur la compétence, nous écrivons nos procédures, nous suivons nos résultats. C'est cette discipline que nous transmettons.</p>
<h3>Comment nous travaillons</h3>
<ul><li>Un diagnostic de départ, honnête et chiffré.</li><li>Un plan d'action concret, avec des priorités claires.</li><li>Un accompagnement dans la mise en œuvre, pas seulement un rapport.</li><li>Des indicateurs pour mesurer les progrès.</li></ul>
<h3>Le cerveau du groupe</h3>
<p>En interne, cette branche porte la marque KWAAA, structure les ventes de chaque branche, organise les finances et pilote les recrutements. Elle garantit que le groupe grandit avec méthode.</p>
<h3>Ce que nous voulons changer</h3>
<p>Nous voulons voir émerger au Congo et en Afrique des organisations mieux gérées, plus visibles et plus solides financièrement, capables d'attirer des partenaires et de durer.</p>`
    },
    en: {
      title: "Better-run businesses.",
      lead: "Many organisations have a good product or a strong mission, but lack visibility, financial method or structure. We help them take that step.",
      brief: ["Communication, marketing, finance and human resources.","Methods we apply to ourselves first.","The group's strategic brain."],
      bodyHtml: `<h3>The situation</h3>
<p>Many SMEs, associations and institutions have potential but grow more slowly than they could. Their brand is little known, their sales rest on a few people, their accounts are hard to read and their hiring happens in a rush.</p>
<h3>Our fields</h3>
<ul><li><strong>Communication:</strong> brand identity, messaging, materials and online presence.</li><li><strong>Marketing and sales:</strong> commercial strategy, offers, prospecting and client follow-up.</li><li><strong>Finance and management:</strong> accounting organisation, dashboards, procedures and controls.</li><li><strong>Human resources:</strong> role design, merit-based hiring, team organisation.</li></ul>
<blockquote>What we advise our clients, we practise at home first.</blockquote>
<h3>Our credibility: our own organisation</h3>
<p>KWAAA Group manages its finances in a management tool built by its own team, and is gradually aligning its procedures with the OHADA accounting framework. We hire on competence, we write down our procedures, we track our results. That is the discipline we pass on.</p>
<h3>How we work</h3>
<ul><li>An honest, quantified initial diagnosis.</li><li>A concrete action plan with clear priorities.</li><li>Support through implementation, not just a report.</li><li>Indicators to measure progress.</li></ul>
<h3>The group's brain</h3>
<p>Internally, this branch carries the KWAAA brand, structures each branch's sales, organises finances and runs recruitment. It makes sure the group grows with method.</p>
<h3>What we want to change</h3>
<p>We want to see better-run, more visible and financially stronger organisations emerge in Congo and Africa, able to attract partners and to last.</p>`
    },
  },
  'emploi': {
    slug: 'emploi',
    tag: { fr: "Emploi", en: "Jobs" },
    fr: {
      title: "L'emploi des jeunes.",
      lead: "KWAAA Group est porté par des jeunes. Notre ambition est qu'il devienne une école de leadership pour toute une génération.",
      brief: ["Recrutement au mérite, sans quota ni favoritisme.","Stages rémunérés et priorité à l'embauche locale.","Des responsabilités réelles, liées aux résultats."],
      bodyHtml: `<h3>Le constat</h3>
<p>Chaque année, des milliers de jeunes Congolais terminent leurs études avec l'envie de travailler, d'apprendre et de prouver ce qu'ils valent. Trop souvent, ils se heurtent à des recrutements opaques, à des stages non payés ou à des postes sans perspective.</p>
<h3>Nos engagements</h3>
<ul><li><strong>Le mérite d'abord.</strong> Nous recrutons et promouvons sur la compétence. Un proche n'est embauché que s'il a le niveau requis. Il n'y a ni quota ni passe-droit.</li><li><strong>Des stages rémunérés.</strong> Un stage chez nous est un vrai travail, avec de vraies missions, et il est payé.</li><li><strong>La priorité à l'embauche locale.</strong> À compétence égale, nous recrutons d'abord là où nous travaillons.</li><li><strong>Des responsabilités réelles.</strong> Chez nous, les jeunes ne se contentent pas d'exécuter : ils conduisent des projets.</li></ul>
<blockquote>Un poste chez KWAAA se gagne par le travail, et se garde par les résultats.</blockquote>
<h3>Une culture de la performance</h3>
<p>Nous appliquons à nous-mêmes ce que nous demandons : la rémunération de la direction générale est liée aux résultats. Chacun sait ce qu'on attend de lui et comment son travail est évalué.</p>
<h3>Les fonctions que nous structurons</h3>
<p>Le groupe se construit autour de fonctions clés : direction générale, direction financière, direction des opérations, marketing et ventes. À mesure que nos branches grandissent, chacune ouvrira ses propres postes de responsabilité.</p>
<h3>Nos langues de travail</h3>
<p>Le français, l'anglais et les langues locales. Nous voulons des équipes capables de servir un client à Beni comme un partenaire à Nairobi ou à Johannesburg.</p>
<h3>Rejoindre l'équipe</h3>
<p>Envoyez votre CV et une courte lettre à info@kwaaagroup.com. Indiquez la branche qui vous intéresse et ce que vous voulez y construire.</p>`
    },
    en: {
      title: "Youth employment.",
      lead: "KWAAA Group is driven by young people. Our ambition is for it to become a leadership school for a whole generation.",
      brief: ["Merit-based hiring, with no quotas or favouritism.","Paid internships and local hiring first.","Real responsibility, tied to results."],
      bodyHtml: `<h3>The situation</h3>
<p>Every year, thousands of young Congolese finish their studies eager to work, learn and prove themselves. Too often they run into opaque hiring, unpaid internships or dead-end jobs.</p>
<h3>Our commitments</h3>
<ul><li><strong>Merit first.</strong> We hire and promote on competence. A relative is hired only if they meet the bar. No quotas, no favours.</li><li><strong>Paid internships.</strong> An internship with us is real work, with real assignments, and it is paid.</li><li><strong>Local hiring first.</strong> With equal skills, we recruit first where we work.</li><li><strong>Real responsibility.</strong> Our young people do not just execute: they lead projects.</li></ul>
<blockquote>A job at KWAAA is earned through work, and kept through results.</blockquote>
<h3>A performance culture</h3>
<p>We apply to ourselves what we ask of others: the general manager's pay is tied to results. Everyone knows what is expected of them and how their work is assessed.</p>
<h3>The functions we are building</h3>
<p>The group is being built around key functions: general management, finance, operations, marketing and sales. As our branches grow, each will open its own leadership positions.</p>
<h3>Our working languages</h3>
<p>French, English and local languages. We want teams able to serve a client in Beni as well as a partner in Nairobi or Johannesburg.</p>
<h3>Join the team</h3>
<p>Send your CV and a short letter to info@kwaaagroup.com. Tell us which branch interests you and what you want to build there.</p>`
    },
  },
  'integrite': {
    slug: 'integrite',
    tag: { fr: "Gouvernance", en: "Governance" },
    fr: {
      title: "L'intégrité comme règle.",
      lead: "Un groupe qui veut durer doit être digne de confiance, pour ses clients, ses partenaires, ses équipes et ses associés.",
      brief: ["Tolérance zéro face à la corruption et au tribalisme.","Des lignes rouges connues de tous.","Une gouvernance claire et des finances traçables."],
      bodyHtml: `<h3>Pourquoi c'est central</h3>
<p>Dans un environnement où la confiance se gagne difficilement, l'intégrité n'est pas un supplément moral : c'est un avantage compétitif. Un client revient vers une entreprise qui tient sa parole. Un partenaire investit dans une entreprise dont il comprend les comptes. Un talent reste dans une entreprise où le mérite compte.</p>
<h3>Nos valeurs</h3>
<ul><li><strong>Ambition :</strong> voir grand, le Congo d'abord, l'Afrique ensuite.</li><li><strong>Flexibilité :</strong> s'adapter vite au terrain et aux opportunités, sans perdre le cap.</li><li><strong>Circularité :</strong> chaque branche est l'intrant de l'autre.</li><li><strong>Constance :</strong> tenir nos engagements de qualité et de délais, projet après projet.</li></ul>
<h3>Tolérance zéro</h3>
<p>La corruption et le tribalisme n'ont aucune place chez KWAAA, à aucun niveau, ni en interne ni avec nos partenaires.</p>
<blockquote>Nos règles s'appliquent à tous, à commencer par les fondateurs.</blockquote>
<h3>Nos lignes rouges</h3>
<ul><li>Le détournement de fonds.</li><li>Le non-respect des procédures.</li><li>L'ivresse au travail.</li></ul>
<p>Elles sont connues de chaque collaborateur dès son arrivée.</p>
<h3>Une gouvernance claire</h3>
<ul><li>KWAAA Group est une SARL de droit OHADA.</li><li>Les décisions importantes sont prises par les associés. Les désaccords sérieux sont tranchés en assemblée générale.</li><li>La direction générale rend des comptes, et sa rémunération est liée aux résultats.</li><li>Toutes nos opérations financières sont enregistrées dans un outil de gestion unique, en cours d'alignement avec les normes comptables OHADA.</li></ul>
<h3>Ce que nous voulons changer</h3>
<p>Nous voulons démontrer qu'une entreprise africaine peut être à la fois ambitieuse et irréprochable, et que cette exigence attire les meilleurs clients, partenaires et talents.</p>`
    },
    en: {
      title: "Integrity as the rule.",
      lead: "A group that wants to last must be trustworthy: for its clients, partners, teams and shareholders.",
      brief: ["Zero tolerance for corruption and tribalism.","Red lines everyone knows.","Clear governance and traceable finances."],
      bodyHtml: `<h3>Why it is central</h3>
<p>Where trust is hard to earn, integrity is not a moral extra: it is a competitive edge. Clients come back to a company that keeps its word. Partners invest in a company whose accounts they understand. Talent stays where merit counts.</p>
<h3>Our values</h3>
<ul><li><strong>Ambition:</strong> think big, Congo first, then Africa.</li><li><strong>Flexibility:</strong> adapt fast to the field and to opportunities, without losing course.</li><li><strong>Circularity:</strong> each branch is an input for another.</li><li><strong>Consistency:</strong> meet our quality and delivery commitments, project after project.</li></ul>
<h3>Zero tolerance</h3>
<p>Corruption and tribalism have no place at KWAAA, at any level, internally or with our partners.</p>
<blockquote>Our rules apply to everyone, starting with the founders.</blockquote>
<h3>Our red lines</h3>
<ul><li>Embezzlement.</li><li>Disregarding procedures.</li><li>Drunkenness at work.</li></ul>
<p>Every team member learns them on day one.</p>
<h3>Clear governance</h3>
<ul><li>KWAAA Group is a limited liability company under OHADA law.</li><li>Major decisions are taken by the partners. Serious disagreements are settled by the general assembly.</li><li>The general manager is accountable, and their pay is tied to results.</li><li>All our financial operations are recorded in a single management tool, being aligned with OHADA accounting standards.</li></ul>
<h3>What we want to change</h3>
<p>We want to show that an African company can be both ambitious and beyond reproach, and that this standard attracts the best clients, partners and talent.</p>`
    },
  },
};

export function articleBySlug(slug: string): Article | undefined {
  return ARTICLES[slug as ArticleSlug];
}

export function nextArticles(slug: ArticleSlug, n = 3): ArticleSlug[] {
  const i = ARTICLE_ORDER.indexOf(slug);
  const out: ArticleSlug[] = [];
  for (let k = 1; k <= ARTICLE_ORDER.length && out.length < n; k++) {
    const s = ARTICLE_ORDER[(i + k) % ARTICLE_ORDER.length];
    if (s !== slug) out.push(s);
  }
  return out;
}
