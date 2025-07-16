class MenuManager {
    constructor() {
        this.currentMenu = 'hauptspeisekarte';
        this.currentFilter = 'all';
        this.expandedItem = null;
        this.searchTerm = '';
        this.menuData = this.initializeMenuData();
        this.init();
    }

    init() {
        this.setupMenuTabs();
        this.setupFilters();
        this.setupSearch();
        this.setupBackToTop();
        this.setupScrollAnimations();
        this.renderMenu();
    }

    initializeMenuData() {
        return {
            hauptspeisekarte: {
                'Aperitif': [
                    {
                        number: '160',
                        name: 'Martini Blanco',
                        price: '6,50',
                        description: 'Klassischer italienischer Wermut mit frischen Kräutern und Zitrusnoten',
                        image: '/images/martini-blanco.png',
                        labels: ['Farbstoffe', 'Alkohol'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '162',
                        name: 'Campari (Orange & Soda)',
                        price: '8,50',
                        description: 'Erfrischender Aperitif mit bitteren Kräuternoten, serviert mit Orangensaft und Soda',
                        image: '/images/campari-orange-soda.png',
                        labels: ['Farbstoffe', 'Alkohol'],
                        vegetarian: true,
                        vegan: true
                    },
										{
                        number: '163',
                        name: 'Prosecco',
                        price: '5,90',
                        description: 'Spritziger italienischer Schaumwein mit feinen Perlen',
                        image: '/images/prosecco.png',
                        labels: ['Alkohol'],
                        vegetarian: true,
                        vegan: true
                    },
										{
                        number: '164',
                        name: 'Aperol Spritz',
                        price: '9,90',
                        description: 'Erfrischender Cocktail aus Aperol, Prosecco und Soda, garniert mit einer Orangenscheibe',
                        image: '/images/aperol.png',
                        labels: ['Alkohol'],
                        vegetarian: true,
                        vegan: true
                    },
										{
                        number: '165',
                        name: 'Lillet Rosé Wild Berry',
                        price: '9,90',
                        description: 'Fruchtiger Aperitif mit Lillet Rosé, frischen Beeren und einem Hauch von Minze',
                        image: '/images/lillet-rose.png',
                        labels: ['Alkohol'],
                        vegetarian: true,
                        vegan: true
                    },
										{
                        number: '166',
                        name: 'Hugo',
                        price: '9,90',
                        description: 'Erfrischender Cocktail aus Prosecco, Holunderblütensirup, Minze und Limette',
                        image: '/images/hugo.png',
                        labels: ['Alkohol'],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                'Kalte Vorspeisen': [
                    {
                        number: '1',
                        name: 'Zaziki',
                        price: '6.90',
                        description: 'Hausgemachter griechischer Joghurt mit Gurken, Knoblauch und Olivenöl',
                        image: '/images/zaziki.png',
                        labels: ['glutenhaltig', 'Milch, Laktose'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        number: '2',
                        name: 'Dreierlei griechische Dips',
                        price: '10,90',
                        description: 'Eine Auswahl unserer besten Dips',
                        image: '/images/griechische-dips.jpg',
                        labels: ['Konservierungsstoffe', 'aufgetaute Fischprodukte', 'glutenhaltig', 'Soja', 'Milch, Laktose'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '3',
                        name: 'Oliven & Peperoni',
                        price: '9,10',
                        description: 'Eine Auswahl an griechischen Oliven und Peperoni, dazu Oregano und Olivenöl',
                        image: '/images/oliven-peperoni.png',
                        labels: ['Fisch', 'Eier'],
                        vegetarian: false,
                        vegan: false
                    },
										{
                        number: '4',
                        name: 'Olympos Vorspeisenplatte',
                        price: '19,90',
                        description: 'Eine kleine Auswahl unserer kalten Vorspeisen',
                        image: '/images/olympos.png',
                        labels: ['Konservierungsstoffe', 'Antioxidationsmittel', 'Eisen-II-gluconat', 'aufgetaute Fischprodukte', 'glutenhaltig', 'Soja', 'Milch', 'Schwefeldioxid'],
                        vegetarian: false,
                        vegan: false
                    }
                ],
                'Warme Vorspeisen': [
                    {
                        number: '7',
                        name: 'Peperoni gegrillt',
                        price: '9.90',
                        description: 'Gegrillte Peperoni mit Knoblauchsauce und Kräuterbutter',
                        image: '/images/peperoni-gegrillt.png',
                        labels: ['Konservierungsstoffe', 'Antioxidationsmittel', 'Schwefeldioxid'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        number: '8',
                        name: 'Gefüllte Florinis',
                        price: '13,50',
                        description: 'Die berühmte Paprikaschote aus Florina, gefüllt mit Fetakäse',
                        image: '/images/florinis.jpg',
                        labels: ['Konservierungsstoffe', 'Süßungsmittel'],
                        vegetarian: true,
                        vegan: false
                    },
										{
                        number: '9',
                        name: 'Dicke Bohnen',
                        price: '13,50',
                        description: 'Griechische dicke Bohnen überbacken mit Fetakäse',
                        image: '/images/bohnen.avif',
                        labels: ['Antioxidationsmittel', 'Soja'],
                        vegetarian: true,
                        vegan: false
                    },
										{
                        number: '10',
                        name: 'Tiropitakia & Spanakopitakia',
                        price: '13,90',
                        description: 'Kleine gefüllte Blätterteigtaschen mit Feta und Spinat, dazu Zaziki',
                        image: '/images/katerinas.jpg',
                        labels: ['glutenhaltig', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
										{
                        number: '11',
                        name: 'Auberginen & Zucchini',
                        price: '14,50',
                        description: 'Gebratene Auberginen und Zucchini mit Knoblauch-Joghurt-Sauce und Zaziki',
                        image: '/images/auberginen.png',
                        labels: ['glutenhaltig', 'Milch', 'Schalenfrüchte'],
                        vegetarian: true,
                        vegan: false
                    },
										{
                        number: '12',
                        name: 'Gefüllte Champignons',
                        price: '14,50',
                        description: 'Champignons gefüllt mit Spinat und mit Fetakäse überbacken',
                        image: '/images/champignons.png',
                        labels: ['Milch'],
                        vegetarian: true,
                        vegan: false
                    },
										{
                        number: '13',
                        name: 'Ilios - Vorspeisen',
                        price: '21,90',
                        description: 'Eine große Auswahl unserer warmen Vorspeisen',
                        image: '/images/Ilios.png',
                        labels: ['Konservierungsstoffe', 'Antioxidationsmittel', 'Süßungsmittel', 'glutenhaltig', 'Soja', 'Milch', 'Sellerie'],
                        vegetarian: true,
                        vegan: false
                    },
                ],
                 'Käse-Spezialitäten': [
                    {
                        number: '15',
                        name: 'Chtipiti',
                        price: '11,90',
                        description: 'Fetakäse mit scharfer Paprika serviert',
                        image: '/images/chtipiti.png',
                        labels: ['Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        number: '16',
                        name: 'Halloumi',
                        price: '13,90',
                        description: 'gegrillter Käse aus Zypern, serviert mit Tomaten & Olivenöl',
                        image: '/images/halloumi.png',
                        labels: ['Konservierungsstoffe', 'Süßungsmittel', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                     {
                        number: '17',
                        name: 'Fetakäse im Ofen',
                        price: '14,50',
                        description: 'original griechischer Fetakäse mit Zwiebeln, Cherrytomaten, Peperoni und Olivenöl, im Ofen überbacken',
                        image: '/images/gegr-feta.png',
                        labels: ['Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                     {
                        number: '18',
                        name: 'Ziegenkäse',
                        price: '13,90',
                        description: 'Ziegenkäse im Blätterteig mit Honig und Sesam verfeinert',
                        image: '/images/ziegenkaese.png',
                        labels: ['glutenhaltig', 'Milch', 'Sesamsamen'],
                        vegetarian: true,
                        vegan: false
                    },
                ],
                 'Vorspeisen aus dem Meer': [
                    {
                        number: '20',
                        name: 'Kalamariringe',
                        price: '15,50',
                        description: 'gebratene Kalamariringe mit Zitronen-Knoblauchsauce, dazu Zaziki',
                        image: '/images/kalamariringe.png',
                        labels: ['aufgetaute Fischprodukte', 'glutenhaltig', 'Schalenfrüchte', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '21',
                        name: 'Oktopus gegrillt',
                        price: '19,50',
                        description: 'gegrillter Oktopus mit Zitronen-Knoblauchsauce und hausgemachtem Brot',
                        image: '/images/oktopus.png',
                        labels: ['aufgetaute Fischprodukte', 'glutenhaltig', 'Schalenfrüchte', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                     {
                        number: '23',
                        name: 'Knoblauchbrot',
                        price: '5,90',
                        description: 'Knoblauchbrot nach Art des Hauses',
                        image: '/images/knoblauchbrot.png',
                        labels: ['glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '24',
                        name: 'Pitabrot',
                        price: '4,90',
                        description: 'deftiges Fladenbrot vom Grill',
                        image: '/images/Pita.png',
                        labels: ['glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '25',
                        name: 'Pitabrot mit Feta',
                        price: '7,50',
                        description: 'deftiges Fladenbrot vom Grill mit Fetakäse',
                        image: '/images/gpita-feta.png',
                        labels: ['glutenhaltig', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    }
                ],

                 'Suppen': [
                    {
                        number: '27',
                        name: 'Tomatensuppe',
                        price: '6,90',
                        description: 'Griechische Tomatensuppe mit frischen Kräutern und Gemüse',
                        image: '/images/tomatensuppe.jpg',
                        labels: ['Konservierungsstoffe', 'glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '28',
                        name: 'Bohnensuppe',
                        price: '6,90',
                        description: 'Griechische Bohnensuppe mit frischen Kräutern und Gemüse',
                        image: '/images/bohnensuppe.jpg',
                        labels: ['Antioxidationsmittel', 'glutenhaltig', 'Soja'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '29',
                        name: 'Zwiebelsuppe',
                        price: '6,90',
                        description: 'Griechische Zwiebelsuppe mit Käse überbacken',
                        image: '/images/zwiebelsuppe.jpg',
                        labels: ['Antioxidationsmittel', 'glutenhaltig', 'Soja'],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                 'Salate': [
                    {
                        number: '30',
                        name: 'Choriatiki Salat',
                        price: '16,50',
                        description: 'original griechischer Bauernsalat mit Tomaten, Gurken, Paprika, Feta, Oliven, Olivenöl, serviert mit Brot',
                        image: '/images/choriatiki.jpg',
                        labels: ['Farbstoffe', 'Konservierungsstoffe', 'Süßungsmittel', 'glutenhaltig', 'Milch', 'Senf'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        number: '31',
                        name: 'Greek-Duett-Salat',
                        price: '24,90',
                        description: 'frischer Saisonsalat mit Lammspieß vom Grill, Ziegenkäse in Blätterteig, Tomaten, Gurken und Paprika an hausgemachtem Dressing und Brot',
                        image: '/images/greek-duet.jpg',
                        labels: ['Farbstoffe', 'Konservierungsstoffe', 'Süßungsmittel', 'glutenhaltig', 'Milch', 'Senf'],
                        vegetarian: false,
                        vegan: false
                    },
                     {
                        number: '32',
                        name: 'Iraklio Salat',
                        price: '24,90',
                        description: 'frischer Saisonsalat mit gegrilltem Lachsfilet, Tomaten, Gurke und Paprika an hausgemachtem Dressing und Brot',
                        image: '/images/iraklio.jpg',
                        labels: ['Konservierungsstoffe', 'Süßungsmittel', 'glutenhaltig', 'Senf'],
                        vegetarian: false,
                        vegan: false
                    },
                     {
                        number: '33',
                        name: 'Salat des Hauses',
                        price: '20,90',
                        description: 'frischer Saisonsalat mit gegrilltem Hühnerfilet, Tomaten, Gurke und Paprika an hausgemachtem Dressing und Brot',
                        image: '/images/salat-haus.jpg',
                        labels: ['Konservierungsstoffe', 'Süßungsmittel', 'glutenhaltig', 'Senf'],
                        vegetarian: false,
                        vegan: false
                    }
                ],
                'Gyros und Grillspezialitäten': [
                    {
                        number: '40',
                        name: 'Gyros-Klassik',
                        price: '20,90',
                        description: 'geschnetzeltes Schweinefleisch, serviert mit Zaziki und Knoblauchkartoffeln',
                        image: '/images/gyros-klassik.png',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '41',
                        name: 'Gyros Klassik - kleine Portion',
                        price: '16,90',
                        description: 'geschnetzeltes Schweinefleisch, serviert mit Zaziki und Knoblauchkartoffeln',
                        image: '/images/gyros-klassik.png',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
					{
                        number: '42',
                        name: 'Bifteki',
                        price: '22,90',
                        description: 'Würzig gegrillte Hacksteaks mit original griechischem Fetakäse gefüllt, dazu Rosmarinkartoffeln, mit Knoblauch',
                        image: '/images/bifteki.png',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '43',
                        name: 'Bifteki - kleine Portion',
                        price: '17,90',
                        description: 'Würzig gegrillte Hacksteaks mit original griechischem Fetakäse gefüllt, dazu Rosmarinkartoffeln, mit Knoblauch',
                        image: '/images/bifteki.png',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '44',
                        name: 'Souvlaki',
                        price: '22,50',
                        description: 'Zwei gegrillte Schweinefleisch-Spieße mit Fetakäse, dazu Rosmarinkartoffeln, mit Knoblauch',
                        image: '/images/souvlaki.png',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '45',
                        name: 'Souvlaki - kleine Portion',
                        price: '17,90',
                        description: 'Zwei gegrillte Schweinefleisch-Spieße mit Fetakäse, dazu Rosmarinkartoffeln, mit Knoblauch',
                        image: '/images/souvlaki.png',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                     {
                        number: '46',
                        name: 'Hähnchenbrustfilet',
                        price: '22,90',
                        description: 'Hähnchenbrustfilet vom Grill, serviert mit Zaziki, griechischen Reisnudeln & Kräuterbutter',
                        image: '/images/haenchenbrust.png',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                     {
                        number: '47',
                        name: 'Hähnchenbrustfilet - kleine Portion',
                        price: '17,50',
                        description: 'Hähnchenbrustfilet vom Grill, serviert mit Zaziki, griechischen Reisnudeln & Kräuterbutter',
                        image: '/images/haenchenbrust.png',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                     {
                        number: '48',
                        name: 'Kalbsleber',
                        price: '27,50',
                        description: 'gegrillte Kalbsleber mit gerösteten Zwiebeln, Backkartoffeln und Apfelscheiben, mit Knoblauch',
                        image: '/images/kalbsleber.png',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '49',
                        name: 'Schweinemedaillions',
                        price: '26,90',
                        description: 'Zarte Schweinemedaillions vom Grill mit Metaxasauce und Rosmarinkartoffeln, mit Knoblauch',
                        image: '/images/schweinemedaillions.png',
                        labels: ['Milch', 'Farbstoffe', 'glutenhaltig'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '52',
                        name: 'Fileto Gemisto',
                        price: '26,90',
                        description: 'Hähnchenbrustfilet gefüllt mit Spinat, dazu Fetakäse, Champignonsauce und Rosmarinkartoffeln, mit Knoblauch',
                        image: '/images/fileto.png',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },

                ],
                'Gemischte Fleischplatten vom Grill': [
                    {
                        number: '56',
                        name: 'Chania Teller',
                        price: '22,90',
                        description: 'Gyros, Souvlaki, Zaziki und Knoblauchkartoffeln',
                        image: '/images/chania.jpg',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '57',
                        name: 'Grill Teller',
                        price: '24,50',
                        description: 'Gyros, Souvlaki, Suzuki, Knoblauchkartoffeln und Zaziki',
                        image: '/images/grill-teller.jpg',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '58',
                        name: 'Lasithi Teller',
                        price: '23,90',
                        description: 'Gyros, Bifteki gefüllt mit original griechischem Fetakäse, Zaziki und griechischen Reisnudeln',
                        image: '/images/lasithi.jpg',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                     {
                        number: '59',
                        name: 'Metsovo Piato',
                        price: '25,50',
                        description: 'Gyros, Hähnchenbrustfilet, Kalbsleber, Zaziki und Rosmarinkartoffeln',
                        image: '/images/metsovo.png',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                      {
                        number: '60',
                        name: 'Amnissos Teller',
                        price: '26,50',
                        description: 'Gyros, Schweinefiletmedaillons, Hähnchenbrustfilet, Zaziki und Rosmarinkartoffeln',
                        image: '/images/amnissos.jpg',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                   {
                        number: '61',
                        name: 'Potsdamer Teller',
                        price: '27,90',
                        description: 'Gyros, Lammsteak, Kalbsleber und Schweinefiletmedaillons, serviert mit Zaziki und Knoblauchkartoffeln',
                        image: '/images/potsdamer.webp',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                     {
                        number: '62',
                        name: 'Meteora Piato',
                        price: '28,90',
                        description: 'zarter Lammspieß vom Grill, Kalbsleber, Gyros mit Zaziki und Kartoffelngratin',
                        image: '/images/meteora.jpg',
                        labels: ['Konservierungsstoffe', 'Süßungsmittel', 'aufgetaute Fleischprodukte', 'Milch', 'Senf'],
                        vegetarian: false,
                        vegan: false
                    },
                ],
                'Schnitzel': [
                    {
                        number: '70',
                        name: 'Schweineschnitzel',
                        price: '20,90',
                        description: 'paniertes Schweineschnitzel mit Pommes Frites',
                        image: '/images/schnitzel.jpg',
                        labels: [],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '71',
                        name: '+ Metaxasauce',
                        price: '3,00',
                        description: '',
                        image: '/images/metaxasauce.webp',
                        labels: ['Farbstoffe', 'glutenhaltig', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        number: '72',
                        name: '+ Champignonrahmsauce',
                        price: '3,90',
                        description: '',
                        image: '/images/champignon.webp',
                        labels: ['glutenhaltig', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        number: '',
                        name: '+ gemischter Salat',
                        price: '4,50',
                        description: '',
                        image: '/images/salat.jpeg',
                        labels: [],
                        vegetarian: true,
                        vegan: true
                    },
                ],
                 'Traditionelle griechische Küche': [
                    {
                        number: '73',
                        name: 'Stifado',
                        price: '26,90',
                        description: 'Gebackenes Lammfleisch im eigenen Saft geschmort mit Zwiebeln und Rosmarinkartoffeln, mit Knoblauch',
                        image: '/images/stifado.webp',
                        labels: ['Konservierungsstoffe'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '75',
                        name: 'Lamm mit Riesenbohnen',
                        price: '26,90',
                        description: 'Im eigenen Saft geschmort mit griechischen Nudeln, mit Käse überbacken, mit Knoblauch',
                        image: '/images/lamm.webp',
                        labels: ['Konservierungsstoffe', 'Antioxidationsmittel', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '76',
                        name: 'Moussaka',
                        price: '3,90',
                        description: 'Traditioneller griechischer Auflauf mit Auberginen, Kartoffeln, Béchamelsauce, Hackfleisch und mit Käse verfeinert, mit Knoblauch',
                        image: '/images/moussaka.avif',
                        labels: ['glutenhaltig', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        number: '77',
                        name: 'Moussaka vegetarisch',
                        price: '21,50',
                        description: 'Traditioneller griechischer Auflauf mit Auberginen, Kartoffeln, Béchamelsauce, Karotten, Champignons und mit Käse verfeinert',
                        image: '/images/moussaka.avif',
                        labels: ['glutenhaltig', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        number: '78',
                        name: 'Gemüsepfanne mit Kritharaki',
                        price: '20,50',
                        description: 'verschiedene Gemüse mit griechischen Reisnudeln in Basilikum-Tomaten-Sauce und geriebenem Gauda sowie original griechischem Fetakäse',
                        image: '/images/gemuesepfanne.jpg',
                        labels: ['Konservierungsstoffe', 'glutenhaltig', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        number: '79',
                        name: 'Lachanika Kaseri',
                        price: '21,90',
                        description: 'verschiedenes Gemüse in Champignonssauce, mit Käse überbacken',
                        image: '/images/lachanika.jpg',
                        labels: ['Farbstoffe', 'glutenhaltig', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                    
                ],
                 'Überbackenes': [
                    {
                        number: '94',
                        name: 'Rollakia überbacken',
                        price: '25,90',
                        description: 'panierte Steakröllchen gefüllt mit Fetakäse und Tomaten, mit Metaxasauce und Edamerkäse überbacken, dazu Knoblauchkartoffeln',
                        image: '/images/ueberbacken-1.jpeg',
                        labels: ['Farbstoffe', 'glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '95',
                        name: 'Gyros',
                        price: '26,90',
                        description: 'mit Metaxasauce und Edamerkäse überbacken, dazu Knoblauchkartoffeln',
                        image: '/images/gyros-ueberbacken.webp',
                        labels: ['Farbstoffe', 'glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '96',
                        name: 'Hähnchenbrustfilet',
                        price: '23,50',
                        description: 'mit Metaxasauce und Edamerkäse überbacken, dazu Knoblauchkartoffeln',
                        image: '/images/haehnchen-ueberbacken.avif',
                        labels: ['Farbstoffe', 'glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '97',
                        name: 'Schweinefilet',
                        price: '25,90',
                        description: 'mit Metaxasauce und Edamerkäse überbacken, dazu Knoblauchkartoffeln',
                        image: '/images/schweinefilet-ueberbacken.jpg',
                        labels: ['Farbstoffe', 'glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '98',
                        name: 'Souvlaki überbacken',
                        price: '24,90',
                        description: 'mit Metaxasauce und Edamerkäse überbacken, dazu Knoblauchkartoffeln',
                        image: '/images/souvlaki-ueberbacken.jpg',
                        labels: ['Farbstoffe', 'glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '99',
                        name: 'Bifteki überbacken',
                        price: '24,50',
                        description: 'Hackfleischsteak vom Grill, gefüllt mit Feta, in Metaxasauce und mit Edamerkäse überbacken, dazu Knoblauchkartoffeln',
                        image: '/images/bifteki.jpg',
                        labels: ['Farbstoffe', 'glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                ],
                 'Pfännchen-Spezialitäten': [
                    {
                        number: '86',
                        name: 'Pfännchen Rhodos',
                        price: '26,90',
                        description: 'Schweinefilet in Champignonrahmsauce verfeinert, dazu Rosmarinkartoffeln, mit Knoblauch',
                        image: '/images/schweinefilet-pfanne.jpg',
                        labels: ['Farbstoffe', 'glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '88',
                        name: 'Pfännchen Naxos',
                        price: '25,90',
                        description: 'Hähnchenbrustfilet in Metaxasauce, dazu Rosmarinkartoffeln, mit Knoblauch',
                        image: '/images/haehnchen-metaxa.jpg',
                        labels: ['Farbstoffe', 'glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '89',
                        name: 'Pfännchen Meteora',
                        price: '34,50',
                        description: 'Lammfilet in Metaxasauce, dazu Rosmarinkartoffeln, mit Knoblauch',
                        image: '/images/lammfilet.jpg',
                        labels: ['Farbstoffe', 'glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    }
                ],
                 'Fischspezialitäten': [
                    {
                        number: '110',
                        name: 'Kalamari',
                        price: '24,90',
                        description: 'frisch gebraten, dazu Zitronen-Knoblauchsauce, griechische Reisnudeln und Zaziki',
                        image: '/images/kalamari.jpg',
                        labels: ['Konservierungsstoffe', 'aufgetaute Fischprodukte', 'glutenhaltig', 'Milch', 'Schalenfrüchte', 'Weichtiere'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '111',
                        name: 'Kalamari - klein',
                        price: '16,90',
                        description: 'frisch gebraten, dazu Zitronen-Knoblauchsauce, griechische Reisnudeln und Zaziki',
                        image: '/images/kalamari.jpg',
                        labels: ['Konservierungsstoffe', 'aufgetaute Fischprodukte', 'glutenhaltig', 'Milch', 'Schalenfrüchte', 'Weichtiere'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '112',
                        name: 'Lachsfilet',
                        price: '28,90',
                        description: 'frisch gebraten, dazu Zitronen-Knoblauchsauce, frisches Gemüse und Rosmarinkartoffeln',
                        image: '/images/lachsfilet.jpg',
                        labels: ['Konservierungsstoffe', 'aufgetaute Fischprodukte', 'glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: '113',
                        name: 'Zanderfilet',
                        price: '28,90',
                        description: 'frisch gebraten, dazu Zitronen-Knoblauchsauce, frisches Gemüse und Rosmarinkartoffeln',
                        image: '/images/zanderfilet.jpg',
                        labels: ['Konservierungsstoffe', 'aufgetaute Fischprodukte', 'glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                     {
                        number: '114',
                        name: 'Zanderfilet - klein',
                        price: '17,90',
                        description: 'frisch gebraten, dazu Zitronen-Knoblauchsauce, frisches Gemüse und Rosmarinkartoffeln',
                        image: '/images/zanderfilet.jpg',
                        labels: ['Konservierungsstoffe', 'aufgetaute Fischprodukte', 'glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    }
                ],
                 'Beilagen': [
                    {
                        number: '125',
                        name: 'Pommes Frites',
                        price: '5,50',
                        description: '',
                        image: '/images/frites.jpeg',
                        labels: ['glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '127',
                        name: 'Kroketten',
                        price: '5,90',
                        description: '',
                        image: '/images/kroketten.jpeg',
                        labels: ['glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '128',
                        name: 'Griechische Reisnudeln',
                        price: '6,90',
                        description: '',
                        image: '/images/griechische-reisnudeln.jpg',
                        labels: ['glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '129',
                        name: 'Backkartoffeln mit Sauerrahm',
                        price: '8,90',
                        description: '',
                        image: '/images/ofenkartoffel.webp',
                        labels: ['glutenhaltig'],
                        vegetarian: true,
                        vegan: false
                    },
                     {
                        number: '130',
                        name: 'Knoblauchkartoffeln',
                        price: '6,90',
                        description: '',
                        image: '/images/knoblauchkartoffeln.jpg',
                        labels: [],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '131',
                        name: 'Kartoffelgratin',
                        price: '8,90',
                        description: '',
                        image: '/images/kartoffelgratin.jpg',
                        labels: ['Konservierungsstoffe', 'Süßungsmittel', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        number: '132',
                        name: 'Frisches Gemüse',
                        price: '7,10',
                        description: '',
                        image: '/images/frisches-gemuese.webp',
                        labels: [],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '133',
                        name: 'Rosmarinkartoffeln',
                        price: '7,50',
                        description: '',
                        image: '/images/rosmarinkartoffeln.jpg',
                        labels: [],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                 'Saucen': [
                    {
                        number: '115',
                        name: 'Metaxasauce',
                        price: '5,90',
                        description: '',
                        image: '/images/metaxasauce.webp',
                        labels: ['Farbstoffe', 'glutenhaltig', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        number: '116',
                        name: 'Champignonrahmsauce',
                        price: '6,50',
                        description: '',
                        image: '/images/champignonrahmsauce.webp',
                        labels: ['glutenhaltig', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    }
                ],
                 'Desserts': [
                    {
                        number: '135',
                        name: 'Griechischer Joghurt',
                        price: '8,20',
                        description: 'mit Walnuss und Honig',
                        image: '/images/griechischer-joghurt.avif',
                        labels: ['Konservierungsstoffe', 'Milch', 'Schalenfrüchte', 'Walnuss'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        number: '136',
                        name: 'Galaktoboureko mit Eis',
                        price: '8,50',
                        description: 'Blätterteig mit Gries-Vanillecreme und Vanilleeis',
                        image: '/images/galaktoboureko.jpg',
                        labels: ['Konservierungsstoffe', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                     {
                        number: '137',
                        name: 'Crema Vanille',
                        price: '8,90',
                        description: 'Panna Cotta mit hausgemachter Schlagsahnecreme mit Vanille, serviert mit Marmelade aus frischen Früchten',
                        image: '/images/panna-cotta.jpg',
                        labels: ['Konservierungsstoffe', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    }
                ],
                 'Weißweine': [
                    {
                        number: '250',
                        name: 'Weißer Hauswein',
                        price: '6,90',
                        description: '0,2l - leicht trocken - 🇬🇷 - 12,5% vol',
                        image: '/images/weisser-hauswein.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '251',
                        name: 'Weißer Hauswein',
                        price: '14,90',
                        description: '0,5l - leicht trocken - 🇬🇷 - 12,5% vol',
                        image: '/images/weisser-hauswein.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '252',
                        name: 'Weißer Hauswein',
                        price: '22,90',
                        description: 'Flasche 0,75l - leicht trocken - 🇬🇷 - 12,5% vol',
                        image: '/images/weisser-hauswein.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '253',
                        name: 'Imiglikos',
                        price: '7,90',
                        description: '0,2l - lieblich, leicht, fruchtbetont - 🇬🇷 - 12,5% vol',
                        image: '/images/Imiglikos.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '254',
                        name: 'Imiglikos',
                        price: '24,90',
                        description: 'Flasche 0,75l - lieblich, leicht, fruchtbetont - 🇬🇷 - 12,5% vol',
                        image: '/images/Imiglikos.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '255',
                        name: 'Vilana',
                        price: '7,90',
                        description: '0,2l - fruchtige Aromen von Zitrusfrüchten & Blumen - 🇬🇷 - 12,5% vol \n Empfehlung: Genießen Sie ihn als Aperitif oder zu weißem Fleisch und Salat.',
                        image: '/images/vilana.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '256',
                        name: 'Vilana',
                        price: '23,90',
                        description: 'Flasche 0,75l - fruchtige Aromen von Zitrusfrüchten & Blumen - 🇬🇷 - 12,5% vol \n Empfehlung: Genießen Sie ihn als Aperitif oder zu weißem Fleisch und Salat.',
                        image: '/images/vilana.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '257',
                        name: 'Lyrarakis Weiß',
                        price: '8,90',
                        description: '0,2l - aromatischer Weißwein - 🇬🇷 - 12,5% vol \n Empfehlung: Meeresfrüchte, helles Fleisch und Fisch mit leichten Soßen oder einfach als Aperitif.',
                        image: '/images/Lyrarakis.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '258',
                        name: 'Lyrarakis Weiß',
                        price: '26,90',
                        description: 'Flasche 0,75l - aromatischer Weißwein - 🇬🇷 - 12,5% vol \n Empfehlung: Meeresfrüchte, helles Fleisch und Fisch mit leichten Soßen oder einfach als Aperitif.',
                        image: '/images/Lyrarakis.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '259',
                        name: 'Assyrtiko Voila',
                        price: '9,50',
                        description: '0,2l - Trockener Wein - 🇬🇷 - 13,5% vol \n Empfehlung: Passt wunderbar zu mediterranen Gerichten und besonders zu Fisch und Meeresfrüchten',
                        image: '/images/Assyrtiko.webp',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '260',
                        name: 'Assyrtiko Voila',
                        price: '28,90',
                        description: 'Flasche 0,75l - Trockener Wein - 🇬🇷 - 13,5% vol \n Empfehlung: Passt wunderbar zu mediterranen Gerichten und besonders zu Fisch und Meeresfrüchten',
                        image: '/images/Assyrtiko.webp',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                ],
                 'Roséweine': [
                    {
                        number: '261',
                        name: 'Rosé Hauswein',
                        price: '7,90',
                        description: '0,2l - leicht trocken - 🇬🇷 - 12,5% vol',
                        image: '/images/rosé-hauswein.png',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '262',
                        name: 'Rosé Hauswein',
                        price: '14,90',
                        description: '0,5l - leicht trocken - 🇬🇷 - 12,5% vol',
                        image: '/images/rosé-hauswein.png',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '263',
                        name: 'Rosé Hauswein',
                        price: '23,90',
                        description: 'Flasche 0,75l - leicht trocken - 🇬🇷 - 12,5% vol',
                        image: '/images/rosé-hauswein.png',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                 'Rotweine': [
                    {
                        number: '264',
                        name: 'Roter Hauswein',
                        price: '6,90',
                        description: '0,2l - leicht trocken - 🇬🇷 - 12,5% vol',
                        image: '/images/roter-hauswein.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '265',
                        name: 'Roter Hauswein',
                        price: '14,90',
                        description: '0,5l - leicht trocken - 🇬🇷 - 12,5% vol',
                        image: '/images/roter-hauswein.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '266',
                        name: 'Roter Hauswein',
                        price: '23,90',
                        description: 'Flasche 0,75l - leicht trocken - 🇬🇷 - 12,5% vol',
                        image: '/images/roter-hauswein.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '267',
                        name: 'Imiglikos',
                        price: '7,90',
                        description: '0,2l - Aromen von getrockneten Früchten und Gewürzen - 🇬🇷 - 12% vol \n Empfehlung: Begleitet harmonisch Früchte, süße Speisen und süß-saure Saucen.',
                        image: '/images/Imiglikos.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '268',
                        name: 'Imiglikos',
                        price: '24,90',
                        description: 'Flasche 0,75l - Aromen von getrockneten Früchten und Gewürzen - 🇬🇷 - 12% vol \n Empfehlung: Begleitet harmonisch Früchte, süße Speisen und süß-saure Saucen.',
                        image: '/images/Imiglikos.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '269',
                        name: 'Kotsifali',
                        price: '7,90',
                        description: '0,2l - Gewürze, rote Früchte & pikanter Nachgeschmack - 🇬🇷 - 13% vol \n Empfehlung: Genießen Sie ihn zu mediterranen Gerichten, Fleisch vom Grill und pikanten Käsesorten.',
                        image: '/images/kotsifali.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '270',
                        name: 'Kotsifali',
                        price: '24,90',
                        description: 'Flasche 0,75l - Gewürze, rote Früchte & pikanter Nachgeschmack - 🇬🇷 - 13% vol \n Empfehlung: Genießen Sie ihn zu mediterranen Gerichten, Fleisch vom Grill und pikanten Käsesorten.',
                        image: '/images/kotsifali.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '271',
                        name: 'Lyrarakis Rot',
                        price: '8,90',
                        description: '0,2l - Gewürze, rote Früchte & pikanter Nachgeschmack - 🇬🇷 - 13% vol \n Empfehlung: Genießen Sie ihn zu mediterranen Gerichten, Fleisch vom Grill und pikanten Käsesorten.',
                        image: '/images/lyrarakis.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '272',
                        name: 'Lyrarakis Rot',
                        price: '26,90',
                        description: 'Flasche 0,75l - Gewürze, rote Früchte & pikanter Nachgeschmack - 🇬🇷 - 13% vol \n Empfehlung: Genießen Sie ihn zu mediterranen Gerichten, Fleisch vom Grill und pikanten Käsesorten.',
                        image: '/images/lyrarakis.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                'Flaschen-Weißweine': [
                    {
                        number: '280',
                        name: 'Malagouzia Alpha',
                        price: '28,90',
                        description: 'Flasche 0,75l - Nuancen von Citrus und Pfirsich - 🇬🇷 - 13% vol',
                        image: '/images/malagouzia-alpha.webp',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '281',
                        name: 'Chardon. Papaioannou',
                        price: '29,50',
                        description: 'Flasche 0,75l - Aromen von Banane und Aprikose - 🇬🇷 - 14% vol',
                        image: '/images/chardon-Papaioannou',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '282',
                        name: 'Sauvig. Blanc Aidarinis',
                        price: '29,90',
                        description: 'Flasche 0,75l - Holunder und Kräuter im Aroma - 🇬🇷 - 13,5% vol',
                        image: '/images/Sauvig-Blanc-Aidarinis',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '283',
                        name: 'Thema',
                        price: '33,90',
                        description: 'Flasche 0,75l - Aromen reifer Sommerfrüchte wie Ananas, Mango, Honigmelone - 🇬🇷 - 13% vol',
                        image: '/images/thema.jpeg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                'Flaschen-Roséweine': [
                    {
                        number: '284',
                        name: 'Mikri Kivotos',
                        price: '30,90',
                        description: 'Flasche 0,75l - rosé, trocken, frisch, Aromen nach Rosen und Beeren - 🇬🇷 - 13% vol',
                        image: '/images/mikri.webp',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                'Flaschen-Rotweine': [
                    {
                        number: '285',
                        name: 'Nemea Gofas O.P.A.P.',
                        price: '31,90',
                        description: 'Flasche 0,75l - Aromen aus roten Früchten, sehr elegant - 🇬🇷 - 13,5% vol',
                        image: '/images/nemea.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '286',
                        name: 'Kotsifali – Syrah',
                        price: '32,90',
                        description: 'Flasche 0,75l - trocken mit beerigen Nuancen, geröstete Nüsse & Zimt - 🇬🇷 - 13,5% vol',
                        image: '/images/nemea.jpg',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '287',
                        name: 'Merlot - Cabernet',
                        price: '33,90',
                        description: 'Flasche 0,75l - Waldfrüchte, dunkle Schokolade, Cassis, Vanille & elegant - 🇬🇷 - 14,3% vol',
                        image: '/images/merlot.webp',
                        labels: ['Schwefeldioxide & Sulfite'],
                        vegetarian: true,
                        vegan: true
                    },
                ],
                 'Fassbier': [
                    {
                        number: '201',
                        name: 'Bitburger Pils',
                        price: '4,90',
                        description: '0,4l',
                        image: '/images/bitburger-pils.jpg',
                        labels: ['glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '202',
                        name: 'Benediktiner Hell',
                        price: '5,90',
                        description: '0,5l',
                        image: '/images/benediktiner-hell.jpg',
                        labels: ['glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '203',
                        name: 'Alsterwasser',
                        price: '4,90',
                        description: '0,4l',
                        image: '/images/alsterwasser.jpg',
                        labels: ['glutenhaltig', 'Konservierungsstoffe'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '204',
                        name: 'Weihenstephan Weißbier',
                        price: '5,90',
                        description: '0,5l',
                        image: '/images/weihenstephan-weißbier.webp',
                        labels: ['glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '205',
                        name: 'Russ',
                        price: '5,90',
                        description: '0,5l',
                        image: '/images/russ.jpg',
                        labels: [],
                        vegetarian: true,
                        vegan: true
                    },
                ],
                'Flaschenbier': [
                    {
                        number: '206',
                        name: 'Bitburger alkoholfrei',
                        price: '4,70',
                        description: '0,33l',
                        image: '/images/bitburger-alkofrei.webp',
                        labels: ['glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '207',
                        name: 'Kostritzer',
                        price: '4,70',
                        description: '0,33l',
                        image: '/images/Kostritzer.jpg',
                        labels: ['glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '208',
                        name: 'Weihenstephaner Dunkelweizen',
                        price: '5,90',
                        description: '0,5l',
                        image: '/images/.jpg',
                        labels: ['glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '209',
                        name: 'Weihenstephaner Kristallweizen',
                        price: '5,90',
                        description: '0,5l',
                        image: '/images/.webp',
                        labels: ['glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '210',
                        name: 'Weihenst. Weizen alk.-frei',
                        price: '5,90',
                        description: '0,5l',
                        image: '/images/.jpg',
                        labels: ['glutenhaltig', 'Eiweiss'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '211',
                        name: 'Kandi Malz Malzbier',
                        price: '4,90',
                        description: '0,33l',
                        image: '/images/.jpg',
                        labels: ['glutenhaltig', 'Farbstoffe'],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                'Longdrinks': [
                    {
                        number: '240',
                        name: "Gin Tonic (Hendrick's)",
                        price: '12,50',
                        description: '',
                        image: '/images/.webp',
                        labels: ['Farbstoffe', 'Konservierungsstoffe', 'chininhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '241',
                        name: 'Wodka Lemon',
                        price: '9,90',
                        description: '',
                        image: '/images/.jpg',
                        labels: ['chininhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '242',
                        name: 'Wodka Red Bull',
                        price: '9,90',
                        description: '',
                        image: '/images/.jpg',
                        labels: ['Farbstoffe', 'Konservierungsstoffe', 'Süßungsmittel', 'Koffein'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '243',
                        name: 'Whiskey Cola',
                        price: '9,90',
                        description: '',
                        image: '/images/.webp',
                        labels: ['Farbstoffe', 'Geschmacksverstärker', 'Konservierungsstoffe', 'Süßungsmittel', 'Koffein'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '244',
                        name: 'Cuba Libre',
                        price: '9,90',
                        description: '',
                        image: '/images/.jpg',
                        labels: ['Farbstoffe', 'Geschmacksverstärker', 'Konservierungsstoffe', 'Süßungsmittel', 'Koffein'],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                 'Kaffee und Tee': [
                    {
                        number: '150',
                        name: "Tasse Kaffee",
                        price: '3,50',
                        description: '',
                        image: '/images/.webp',
                        labels: ['Koffein'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '151',
                        name: 'Espresso',
                        price: '3,20',
                        description: '',
                        image: '/images/.jpg',
                        labels: ['Koffein'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        number: '152',
                        name: 'Doppio Espresso',
                        price: '5,10',
                        description: '',
                        image: '/images/.jpg',
                        labels: ['Farbstoffe', 'Konservierungsstoffe', 'Süßungsmittel', 'Koffein'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '243',
                        name: 'Whiskey Cola',
                        price: '9,90',
                        description: '',
                        image: '/images/.webp',
                        labels: ['Farbstoffe', 'Geschmacksverstärker', 'Konservierungsstoffe', 'Süßungsmittel', 'Koffein'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        number: '244',
                        name: 'Cuba Libre',
                        price: '9,90',
                        description: '',
                        image: '/images/.jpg',
                        labels: ['Farbstoffe', 'Geschmacksverstärker', 'Konservierungsstoffe', 'Süßungsmittel', 'Koffein'],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                
            },
            kinderkarte: {
                'Kinderkarte': [
                    {
                        number: 'K1',
                        name: 'Kinder Gyros',
                        price: '8.90',
                        description: 'Kleine Portion Gyros mit Pommes und Tzatziki',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Gluten', 'Milch', 'Schweinefleisch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: 'K2',
                        name: 'Kinder Schnitzel',
                        price: '9.50',
                        description: 'Paniertes Schnitzel mit Pommes und Ketchup',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Gluten', 'Eier', 'Schweinefleisch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: 'K3',
                        name: 'Kinder Nudeln',
                        price: '7.80',
                        description: 'Nudeln mit Tomatensauce und geriebenem Käse',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Gluten', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    }
                ]
            },
            eiskarte: {
                'Eis': [
                    {
                        number: 'E1',
                        name: 'Vanilleeis',
                        price: '4.50',
                        description: 'Cremiges Vanilleeis mit echter Vanille',
                        image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Milch', 'Eier'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        number: 'E2',
                        name: 'Schokoladeneis',
                        price: '4.50',
                        description: 'Reichhaltiges Schokoladeneis mit echter Schokolade',
                        image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Milch', 'Eier'],
                        vegetarian: true,
                        vegan: false
                    }
                ],
                'Dessert': [
                    {
                        number: 'D1',
                        name: 'Eiskaffee',
                        price: '6.80',
                        description: 'Kalter Kaffee mit Vanilleeis und Sahne',
                        image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Milch', 'Koffein'],
                        vegetarian: true,
                        vegan: false
                    }
                ]
            },
            highlightkarte: {
                'Vorspeisen & Salate': [
                    {
                        number: 'H1',
                        name: 'Knossos Mezze Platte',
                        price: '24.90',
                        description: 'Auswahl unserer besten Vorspeisen für 2 Personen',
                        image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Milch', 'Nüsse', 'Fisch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: 'H2',
                        name: 'Griechischer Bauernsalat XXL',
                        price: '16.80',
                        description: 'Großer Salat mit Feta, Oliven, Tomaten und Gurken',
                        image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Milch'],
                        vegetarian: true,
                        vegan: false
                    }
                ],
                'Fisch und Fleischspezialitäten': [
                    {
                        number: 'H10',
                        name: 'Dorade Royal',
                        price: '28.90',
                        description: 'Ganze Dorade vom Grill mit Olivenöl und Zitrone',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Fisch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        number: 'H11',
                        name: 'Lammkeule für 2 Personen',
                        price: '45.90',
                        description: 'Langsam geschmorte Lammkeule mit Kräutern der Provence',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Lammfleisch'],
                        vegetarian: false,
                        vegan: false
                    }
                ]
            }
        };
    }

    setupMenuTabs() {
        const tabs = document.querySelectorAll('.menu-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const menuType = tab.getAttribute('data-menu');
                this.switchMenu(menuType);
            });
        });
    }

    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.setFilter(filter);
            });
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('menu-search');
        searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.filterItems();
        });
    }

    

    setupBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        this.observeCategories = (categories) => {
            categories.forEach(category => observer.observe(category));
        };
    }

    switchMenu(menuType) {
        document.querySelectorAll('.menu-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-menu="${menuType}"]`).classList.add('active');

        document.querySelectorAll('.menu-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(menuType).classList.add('active');

        this.currentMenu = menuType;
        this.renderMenu();
    }

    setFilter(filter) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        this.currentFilter = filter;
        this.filterItems();
    }

    renderMenu() {
        const container = document.getElementById(`${this.currentMenu}-content`);
        const menuData = this.menuData[this.currentMenu];
        
        container.innerHTML = '';

        Object.entries(menuData).forEach(([categoryName, items]) => {
            const categoryElement = this.createCategoryElement(categoryName, items);
            container.appendChild(categoryElement);
        });

        const categories = container.querySelectorAll('.menu-category');
        this.observeCategories(categories);

        this.setupItemInteractions();
        this.filterItems();
    }

    createCategoryElement(categoryName, items) {
        const category = document.createElement('div');
        category.className = 'menu-category';
        
        const iconMap = {
            'Aperitif': 'fas fa-wine-glass',
            'Kalte Vorspeisen': 'fas fa-snowflake',
            'Warme Vorspeisen': 'fas fa-fire',
            'Käse-Spezialitäten': 'fas fa-cheese',
            'Vorspeisen aus dem Meer': 'fas fa-fish',
            'Suppen': 'fa-solid fa-bowl-food',
            'Salate': 'fas fa-leaf',
            'Gyros und Grillspezialitäten': 'fas fa-fire-flame-curved',
            'Gemischte Fleischplatten vom Grill': 'fas fa-drumstick-bite',
            'Schnitzel': 'fas fa-cutlery',
            'Traditionelle griechische Küche': 'fas fa-home',
            'Pfännchen-Spezialitäten': 'fas fa-pot',
            'Überbackenes': 'fas fa-cheese',
            'Fischspezialitäten': 'fas fa-fish',
            'Beilagen': 'fas fa-plate-wheat',
            'Saucen': 'fas fa-bottle-droplet',
            'Desserts': 'fas fa-cake-candles',
            'Weißweine': 'fas fa-wine-bottle',
            'Roséweine': 'fas fa-wine-bottle',
            'Rotweine': 'fas fa-wine-bottle',
            'Kaffee und Tee': 'fas fa-mug-hot',
            'Alkoholfreie Getränke': 'fas fa-glass-water',
            'Säfte': 'fas fa-glass-citrus',
            'Fassbier': 'fas fa-beer-mug-empty',
            'Flaschenbier': 'fas fa-beer',
            'Longdrinks': 'fas fa-martini-glass',
            'Spirituosen': 'fas fa-whiskey-glass',
            'Schorlen': 'fas fa-glass-water-droplet',
            'Flaschen-Weißweine': 'fas fa-wine-bottle',
            'Flaschen-Roséweine': 'fas fa-wine-bottle',
            'Flaschen-Rotweine': 'fas fa-wine-bottle',
            'Kinderkarte': 'fas fa-child',
            'Eis': 'fas fa-ice-cream',
            'Dessert': 'fas fa-cake',
            'Vorspeisen & Salate': 'fas fa-salad',
            'Fisch und Fleischspezialitäten': 'fas fa-fish'
        };

        category.innerHTML = `
            <div class="category-header">
                <div class="category-icon">
                    <i class="${iconMap[categoryName] || 'fas fa-utensils'}"></i>
                </div>
                <h3 class="category-title">${categoryName}</h3>
            </div>
            <div class="menu-items">
                ${items.map(item => this.createItemElement(item)).join('')}
            </div>
        `;

        return category;
    }

    createItemElement(item) {
        const badges = [];
        if (item.vegetarian) badges.push('<span class="item-badge vegetarian" title="Vegetarisch"><i class="fas fa-leaf"></i></span>');
        if (item.vegan) badges.push('<span class="item-badge vegan" title="Vegan"><i class="fas fa-seedling"></i></span>');

        const labels = item.labels.map(label => `<span class="item-label">${label}</span>`).join('');

        return `
            <div class="menu-item" data-vegetarian="${item.vegetarian}" data-vegan="${item.vegan}" data-name="${item.name.toLowerCase()}">
                <div class="menu-item-header">
                    <div class="menu-item-info">
                        <div class="item-number">${item.number}</div>
                        <div class="item-details">
                            <div class="item-name">
                                ${item.name}
                                <div class="item-badges">${badges.join('')}</div>
                            </div>
                        </div>
                    </div>
                    <div class="item-price">${item.price}€</div>
                    <i class="fas fa-chevron-down expand-icon"></i>
                </div>
                <div class="menu-item-content">
                    <div class="item-content-inner">
                        <div class="item-text">
                            <div class="item-description">${item.description}</div>
                            <div class="item-labels">${labels}</div>
                        </div>
                        <div class="item-image">
                            <img src="${item.image}" alt="${item.name}" loading="lazy">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupItemInteractions() {
        const items = document.querySelectorAll('.menu-item');
        items.forEach(item => {
            const header = item.querySelector('.menu-item-header');
            header.addEventListener('click', () => {
                this.toggleItem(item);
            });
        });
    }

    toggleItem(item) {
        const isExpanded = item.classList.contains('expanded');
   
        if (this.expandedItem && this.expandedItem !== item) {
            this.expandedItem.classList.remove('expanded');
        }

        if (isExpanded) {
            item.classList.remove('expanded');
            this.expandedItem = null;
        } else {
            item.classList.add('expanded');
            this.expandedItem = item;
        }
    }

    filterItems() {
        const items = document.querySelectorAll('.menu-item');
        
        items.forEach(item => {
            const isVegetarian = item.getAttribute('data-vegetarian') === 'true';
            const isVegan = item.getAttribute('data-vegan') === 'true';
            const itemName = item.getAttribute('data-name');
            
            let showItem = true;

            if (this.currentFilter === 'vegetarian' && !isVegetarian) {
                showItem = false;
            } else if (this.currentFilter === 'vegan' && !isVegan) {
                showItem = false;
            }

            if (this.searchTerm && !itemName.includes(this.searchTerm)) {
                showItem = false;
            }

            if (showItem) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
                if (item.classList.contains('expanded')) {
                    item.classList.remove('expanded');
                    if (this.expandedItem === item) {
                        this.expandedItem = null;
                    }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MenuManager();
});