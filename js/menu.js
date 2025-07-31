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
                'Signature Drinks': [
                    {
                        name: 'Ouzo Spritz',
                        price: '8',
                        description: 'Ouzo, Tonie & Zitrone',
                        image: '/images/ouzo-spritz.jpeg',
                        labels: ['Konservierungsstoffe', 'Süßungsmittel', 'Schwefeldioxide'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Aperol Spritz',
                        price: '8',
                        description: 'Aperol, Prosecco & Mineralwasser',
                        image: '/images/aperol.png',
                        labels: ['Farbstoffe', 'Süßungsmittel', 'Schwefeldioxide'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Hugo',
                        price: '8',
                        description: 'Holunderblütensirup, Prosecco & Mineralwasser',
                        image: '/images/hugo.png',
                        labels: ['Farbstoffe', 'Süßungsmittel', 'Schwefeldioxide'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        name: 'Lillet Wild Berry',
                        price: '9',
                        description: 'Lillet Blanc, Wildberry-Limonade & frische Beeren',
                        image: '/images/lillet-wild-berry.jpeg',
                        labels: ['Farbstoffe', 'Süßungsmittel', 'Schwefeldioxide'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        name: 'Hausgemachte Limonade',
                        price: '7',
                        description: 'Sprite, frische Limes & Minze',
                        image: '/images/limo.jpeg',
                        labels: ['Farbstoffe', 'Konservierungsstoffe', 'Süßungsmittel'],
                        vegetarian: true,
                        vegan: true
                    },
                      {
                        name: 'Rhabarber Spritz',
                        price: '8',
                        description: 'Aperol, Rhabarbernektar, Prosecco & Mineralwasser',
                        image: '/images/rhabarber-spritz.jpeg',
                        labels: ['Farbstoffe', 'Schwefeldioxide', 'Süßungsmittel'],
                        vegetarian: true,
                        vegan: true
                    },
                  {
                        name: 'Prosecco',
                        price: '6',
                        description: '',
                        image: '/images/prosecco.png',
                        labels: ['Schwefeldioxide'],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                'Kalte & Warme Meze': [
                    {
                        name: 'Tzatziki nach Hausrezept',
                        price: '6',
                        description: 'Griechischer Joghurt mit Knoblauch, Gurke, Kräutern & bestem Olivenöl.',
                        image: '/images/zaziki.png',
                        labels: ['glutenhaltig', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        name: 'Dip-Trio',
                        price: '10',
                        description: 'Tzatziki, Feta-Creme & Taramas (feine Creme aus Fischrogen)',
                        image: '/images/dip-trio.png',
                        labels: ['Konservierungsstoffe', 'aufgetaute Fischprodukte', 'glutenhaltig', 'Soja', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                     {
                        name: 'Heiße Peperoni vom Rost',
                        price: '9',
                        description: 'Knackig gegrillt, leicht pikant & mit hausgemachter Knoblauchsauce',
                        image: '/images/pep-gegrillt.png',
                        labels: ['Konservierungsstoffe', 'Antioxidationsmittel', 'Schwefeldioxid'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        name: 'Melitzanes & Kolokithia',
                        price: '11',
                        description: 'Zart gebratene Auberginen und Zucchini, serviert mit Knoblauchdip und hausgemachtem Tzatziki - leicht und aromatisch.',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['glutenhaltig', 'Milch', 'Schalenfrüchte'],
                        vegetarian: true,
                        vegan: false
                    },
                     {
                        name: 'Feta Fournou',
                        price: '14',
                        description: 'Im Ofen überbackener Feta mit frischen Kräutern & Oregano.',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Konservierungsstoffe', 'Antioxidationsmittel', 'Schwefeldioxid'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        name: 'Calamari-Ringe',
                        price: '14',
                        description: 'Zart & knusprig - frisch zubereitete Calamari-Ringe und Tzatziki dazu',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['aufgetaute Fischprodukte', 'glutenhaltig', 'Fisch', 'Schalenfrüchte', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                     {
                        name: "Poseidon's Liebling",
                        price: '21',
                        description: 'Gegrillter Oktopus, serviert mit Wildkräutersalat & feinstem Olivenöl',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['aufgetaute Fischprodukte', 'Weichtiere'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Helios Genussrunde',
                        price: '22',
                        description: 'Unsere Vorspeisen-Klassiker bunt auf einem Teller',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Konservierungsstoffe', 'Antioxidationsmittel', 'Süßungsmittel', 'glutenhaltig', 'Soja', 'Milch', 'Schwefeldioxid'],
                        vegetarian: true,
                        vegan: false
                    }
                ],
               
                'Etwas zum Tunken': [
                    {
                        name: 'Pitabrot',
                        price: '4',
                        description: 'Warm, weich & perfekt zum Dippen',
                        image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Pita mit Feta',
                        price: '7',
                        description: 'Belegt mit zartem Fetakäse',
                        image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['glutenhaltig', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        name: 'Knoblauchbrot',
                        price: '5',
                        description: 'Knusprig, buttrig, unwiderstehlich - mit griechischem Herz gebacken.',
                        image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                'Suppen': [
                    {
                        name: 'Tomatensuppe',
                        price: '7',
                        description: 'Mit mediterranen Kräutern',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Konservierungsstoffe', 'glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Fasolada',
                        price: '7',
                        description: 'Traditionelle griechische Bohnensuppe',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Antioxidationsmittel', 'glutenhaltig', 'Soja'],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                'Garden of Greece': [
                    {
                        name: 'Choriatiki',
                        price: '16',
                        description: 'Klassischer Bauernsalat mit Tomaten, Gurken, Paprika, Zwiebeln, Kalamataoliven & Feta',
                        image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Farbstoffe', 'Konservierungsstoffe', 'Süßungsmittel', 'glutenhaltig', 'Milch', 'Schwefeldioxid'],
                        vegetarian: true,
                        vegan: false
                    },
                     {
                        name: 'Rote Bete Salat',
                        price: '19',
                        description: 'Frische Rote-Bete und Wildkräutersalat mit gebackenem Feta',
                        image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['aromatisierte Kräuter', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        name: 'Aegean Salat',
                        price: '25',
                        description: 'Blattsalat mit gegrilltem Lammspieß & Ziegenkäse im knusprigen Blätterteig, mit Honig & Sesam',
                        image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['aromatisierte Kräuter', 'aufgetaute Fleischprodukte', 'glutenhaltig', 'Sesamsamen', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    }
                ],
                'Vegetarisch': [
                    {
                        name: 'Gemüse-Kritharaki-Bowl',
                        price: '18',
                        description: 'Herzhafter Gemüseeintopf mit Kritharaki in Tomatensauce & Feta',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Konservierungsstoffe', 'glutenhaltig', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                     {
                        name: 'Bauernpfanne Griechenlands',
                        price: '19',
                        description: 'Bunte Gemüsepfanne mit Gigantes Bohnen, Auberginen, Zucchini, Pilzen und Feta - wie bei Yiayia zu Hause',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Farbstoffe', 'glutenhaltig', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    }
                ],
                'Authentische griechische Küche': [
                    {
                        name: 'Stifado',
                        price: '29',
                        description: 'Zartes Lammfleisch, langsam im eigenen Saft geschmort, mit aromatischen Zwiebeln & feinen Rosmarinkartoffeln',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Konservierungsstoffe', 'aufgetaute Fleischprodukte'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Lammkarree',
                        price: '29',
                        description: 'Ein exquisires Highlight unserer Küche: Drei Stück Lammkrone aus Neuseeland, wo die Lämmer auf weitläufigen Weiden grasen. Serviert mit aromatischen Rosmarinkartoffeln. Ein unvergleichlicher Genuss für anspruchsvolle Gaumen. Tzatziki dazu. (Jedes weitere Stück 8 EUR)',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['aufgetaute Fleischprodukte', 'glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Mousaka',
                        price: '22',
                        description: 'Hausgemachter Auflauf mit Auberginen, Kartoffeln und Hackfleisch, bedeckt mit Béchamelsauce und Käse',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    }
                ],
                'Fische': [
                    
                    {
                        name: 'Zanderfilet',
                        price: '22',
                        description: 'Feines Zanderfilet, frisch gebraten, dazu Gemüse und Rosmarinkartoffeln',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['aufgetaute Fischprodukte', 'glutenhaltig', 'Fisch', 'Schalenfrüchte'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Calamari',
                        price: '22',
                        description: 'Gebratene Kalamari, dazu Rosmarinkartoffeln und Gemüse',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['aufgetaute Fischprodukte', 'glutenhaltig', 'Fisch', 'Weichtiere'],
                        vegetarian: false,
                        vegan: false
                    },
                     {
                        name: 'Meeresgenuss à la Theo',
                        price: '32',
                        description: 'Calamari, Zander & Garnelen - gegrillt und liebevoll angerichtet. Ideal zum Teilen.',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['aufgetaute Fischprodukte', 'glutenhaltig', 'Fisch', 'Weichtiere'],
                        vegetarian: false,
                        vegan: false
                    },

                ],
                'Burger-Laune': [
                    {
                        name: 'Crunchy Chicken Burger',
                        price: '19',
                        description: 'Saftiges Hähnchen in knuspriger Panko-Panade, dazu knuspriger Bacon, feine Burgersauce und knackiger Salat im Brioche-Mehrkornbrot. Serviert mit Pommes Frites, Mayo und Ketchup',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['glutenhaltig', 'Eier', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Chaloumi Burger',
                        price: '18',
                        description: 'Gegrillter Halloumi, knackiger Salat, feine Burgersauce im Brioche-Mehrkornbrot. Dazu Pommes mit Mayo & Ketchup',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['glutenhaltig', 'Eier', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    }
                ],
                'Fleisch': [
                    {
                        name: 'Gyros',
                        price: '20',
                        description: 'Mit Knoblauchkartoffeln und Tzatziki',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Gyros - kleine Portion',
                        price: '17',
                        description: 'Mit Knoblauchkartoffeln und Tzatziki',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: [],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Bifteki',
                        price: '21',
                        description: 'Mit Rosmarinkartoffeln und Tzatziki',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Bifteki - kleine Portion',
                        price: '17',
                        description: 'Mit Rosmarinkartoffeln und Tzatziki',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Souvlaki',
                        price: '21',
                        description: 'Mit Knoblauchkartoffeln und Tzatziki',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Souvlaki - kleine Portion',
                        price: '16',
                        description: 'Mit Knoblauchkartoffeln und Tzatziki',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Hähnchenbrustfilet',
                        price: '23',
                        description: 'Mit Kritharaki, Tzatziki und Käuterbutter',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['glutenhaltig','Milch'],
                        vegetarian: false,
                        vegan: false
                    }
                ],
                'Grillteller': [
                    {
                        name: 'Chasapis Piato',
                        price: '24',
                        description: 'Gyros und Bifteki gefüllt mit Fetakäse, dazu Kritharaki und Tzatziki',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Pyrà Piato',
                        price: '25',
                        description: 'Gyros, Souvlaki & Sutzukakia, dazu Knoblauchkartoffeln und Tzatziki',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Potsdamer Piato',
                        price: '23',
                        description: 'Gyros, Lammsteak und Hähnchenbrustfilet, dazu Knoblauchkartoffeln und Tzatziki',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Milch'],
                        vegetarian: false,
                        vegan: false
                    }
                ],
                'Überbackenes': [
                    {
                        name: 'Gyros',
                        price: '24',
                        description: 'Jedes Gericht wird überzogen mit Metaxasauce und Edamer und serviert mit Knoblauchkartofeln.',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Bifteki',
                        price: '25',
                        description: 'Jedes Gericht wird überzogen mit Metaxasauce und Edamer und serviert mit Knoblauchkartofeln.',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Hähnchenbrustfilet',
                        price: '25',
                        description: 'Jedes Gericht wird überzogen mit Metaxasauce und Edamer und serviert mit Knoblauchkartofeln.',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                ],
                'Beilagen': [
                    {
                        name: 'Pommes Frites',
                        price: '5',
                        description: '',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: [],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Knoblauchkartoffeln',
                        price: '6',
                        description: '',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: [],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Rosmarinkartoffeln',
                        price: '6',
                        description: '',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: [],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Griechische Reisnudeln',
                        price: '6',
                        description: '',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Metaxasauce',
                        price: '4',
                        description: '',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['glutenhaltig', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    }
                ],
                'Für unsere kleinen Helden': [
                    {
                        name: 'Mini Gyros',
                        price: '9',
                        description: 'Mit Pommes',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: [],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Chicken Nuggets',
                        price: '9',
                        description: 'Frisch und hausgemacht. Mit Pommes',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['glutenhaltig'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Grillhähnchen',
                        price: '9',
                        description: 'Mit Pommes',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: [],
                        vegetarian: false,
                        vegan: false
                    }
                ],
                'Desserts': [
                    {
                        name: 'Galaktoboureko',
                        price: '9',
                        description: 'Griechischer Grießauflauf im Filoteig, goldbraun gebacken, mit feinem Zimtsirup',
                        image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['glutenhaltig', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        name: 'Joghurt & Honig',
                        price: '8',
                        description: 'Cremiger griechischer Joghurt mit Honig, knackigen Walnüssen & frischen Früchten',
                        image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Milch', 'Walnuss'],
                        vegetarian: true,
                        vegan: false
                    }
                ],
                'Eisbecher': [
                    {
                        name: 'Gemischtes Eis',
                        price: '6',
                        description: 'Drei Kugeln nach Wahl. Mit Sahne (+1 EUR)',
                        image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Farbstoffe', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                    {
                        name: 'Himbeer-Cup',
                        price: '9',
                        description: 'Drei Kugeln mit heißen Himbeeren & Sahne',
                        image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Farbstoffe', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                     {
                        name: 'Früchtebecher',
                        price: '9',
                        description: 'Eisvariation mit frischen Früchten der Saison & Sahne',
                        image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Farbstoffe', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    },
                     {
                        name: 'Pinocchio-Eis',
                        price: '6',
                        description: 'Zwei Kugeln Eis mit Smarties & Schokoüberraschung',
                        image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Farbstoffe', 'Milch'],
                        vegetarian: true,
                        vegan: false
                    }
                ],
                'Wein': [
                    {
                        name: 'Hauswein',
                        price: '7',
                        description: '(weiß/ rosé/ rot) - 0.2l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxid'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Hauswein',
                        price: '24',
                        description: '(weiß/ rosé/ rot) - 0.75l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxid'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Imiglykos',
                        price: '8',
                        description: '(weiß/ rot) - 0.2l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxid'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Imiglykos',
                        price: '25',
                        description: '(weiß/ rot) - 0.75l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxid'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Retsina',
                        price: '7',
                        description: '(geharzt) - 0.2l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxid'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Retsina',
                        price: '15',
                        description: '(geharzt) - 0.5l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxid'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Lykrarakis',
                        price: '32',
                        description: 'Authentische Weine aus Seltenen Rebsorten, frisch und ausdrucksstark - direkt aus dem Herzen Kretas (weiß/ rot) - 0.75l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxid'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Kotsifali',
                        price: '28',
                        description: 'Typisch kretischer Rotwein mit feiner Frucht, milder Säure und mediterranem Charakter - 0.75l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxid'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Chardonnay',
                        price: '28',
                        description: 'Ein internationaler Weißwein-Klassiker mit feiner Frucht, lebendiger Säure und cremiger Textur - 0.75l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxid'],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                'Alkoholfrei': [
                    {
                        name: 'Wasser',
                        price: '3',
                        description: 'Sprudel- oder Still - 0.25l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: [],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Wasser',
                        price: '7',
                        description: 'Sprudel- oder Still - 0.75l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: [],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Cola / Cola Zero',
                        price: '4.80',
                        description: '0.3l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Süßungsmittel', 'Aspartam', 'koffeinhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Fanta',
                        price: '4.80',
                        description: '0.3l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Farbstoffe', 'Konservierungsstoffe', 'Süßungsmittel'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Sprite',
                        price: '4.80',
                        description: '0.3l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Farbstoffe', 'Konservierungsstoffe', 'Süßungsmittel'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        name: 'Apfelsaft',
                        price: '4.80',
                        description: '0.3l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: [],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        name: 'Johannisbeersaft',
                        price: '4.80',
                        description: '0.3l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: [],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        name: 'Rhabarbersaft',
                        price: '4.80',
                        description: '0.3l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: [],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        name: 'KiBa',
                        price: '4.80',
                        description: 'Kirschnektar & Bananennektar 0.3l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: [],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        name: 'Apfelschorle',
                        price: '4.80',
                        description: '0.3l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: [],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        name: 'Johannisbeerschorle',
                        price: '4.80',
                        description: '0.3l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: [],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        name: 'Rhabarberschorle',
                        price: '4.80',
                        description: '0.3l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: [],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                'Bier': [
                    {
                        name: 'Pils vom Fass',
                        price: '5',
                        description: '0.4l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxid', 'glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Radler',
                        price: '5',
                        description: '0.4l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Konservierungsstoffe','Schwefeldioxid', 'Süßungsmittel', 'glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        name: 'Helles vom Fass',
                        price: '6',
                        description: '0.4l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxid', 'glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        name: 'Weizenbier vom Fass',
                        price: '6',
                        description: '0.5l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxid', 'glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        name: 'Dunkelweizen Flasche',
                        price: '6',
                        description: '0.5l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxid', 'glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        name: 'Kristallweizen Flasche',
                        price: '6',
                        description: '0.5l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxid', 'glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        name: 'Alkoholfreiweizen Flasche',
                        price: '6',
                        description: '0.5l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxid', 'glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        name: 'Alkoholfrei Pils',
                        price: '5',
                        description: '0.33l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxid', 'glutenhaltig'],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                'Kaffee & Tee': [
                    {
                        name: 'Espresso',
                        price: '3',
                        description: '',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['koffeinhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Tasse Kaffee',
                        price: '3.5',
                        description: '',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['koffeinhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Cappuccino',
                        price: '4',
                        description: '',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Milch', 'koffeinhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Ellinikos (Mocca)',
                        price: '3',
                        description: '',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['koffeinhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Tee',
                        price: '3',
                        description: 'verschiedene Sorten',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['koffeinhaltig'],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                'Spirituosen': [
                    {
                        name: 'Ouzo on the rocks',
                        price: '4',
                        description: '4cl',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxide'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Tsipouro',
                        price: '6',
                        description: '4cl',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxide'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Masticha',
                        price: '7',
                        description: '4cl',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxide'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Metaxa',
                        price: '8',
                        description: "Grande Fine - Collector's Edition - 2cl",
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxide'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Amareo Mediterraneo',
                        price: '6',
                        description: '4cl',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxide'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Ouzo Plomari',
                        price: '13',
                        description: '0.2l',
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxide'],
                        vegetarian: true,
                        vegan: true
                    }
                ],
                'Longdrinks': [
                    {
                        name: 'Gin Tonic',
                        price: '12',
                        description: "Hendrick's & Tonic - 0.3l",
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Konservierungsstoffe', 'Süßungsmittel'],
                        vegetarian: true,
                        vegan: true
                    },
                    {
                        name: 'Cuba Libre',
                        price: '9',
                        description: "0.3l",
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: [ 'Farbstoffe','Konservierungsstoffe', 'Antioxidationsmittel', 'Geschmacksverstärker', 'Süßungsmittel', 'koffeinhaltig'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        name: 'Ouzo Lemon',
                        price: '8',
                        description: "0.3l",
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Schwefeldioxid'],
                        vegetarian: true,
                        vegan: true
                    },
                     {
                        name: 'Vodka Orange',
                        price: '4.8',
                        description: "0.3l",
                        image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: ['Süßungsmittel'],
                        vegetarian: true,
                        vegan: true
                    },
                ]
            },
            spezialkarte: {
                'Special Menu / Spezialkarte': [
                    {
                        name: 'Soon available / Bald verfügbar',
                        price: '/',
                        description: 'Exquisite selection of our finest dishes / Exquisite Auswahl unserer besten Gerichte',
                        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
                        labels: [],
                        vegetarian: false,
                        vegan: false
                    }
                ]
            },
            tageskarte: {
                'Tageskarte (12:00 - 16:00 Uhr)': [
                    {
                        name: 'Steak-Pause',
                        price: '14',
                        description: 'Nackensteak mit Pommes & Metaxasauce',
                        image: '/images/nackensteak.jpg',
                        labels: ['glutenhaltig', 'Milch'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Hähnchen-Bowl',
                        price: '15',
                        description: 'Hähnchenbrustfilet mit Gemüse & Kritharaki',
                        image: '/images/haehnchen-bowl.jpg',
                        labels: ['glutenhaltig'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Zanderfilet',
                        price: '16',
                        description: 'mit Rosmarinkartoffeln',
                        image: '/images/zanderfilet.jpg',
                        labels: ['aufgetaute Fischprodukte', 'glutenhaltig'],
                        vegetarian: false,
                        vegan: false
                    },
                    {
                        name: 'Salad-Bowl',
                        price: '13',
                        description: 'Blattsalat mit Tomaten, Gurken, Paprika, Oliven & Fetawürfel, dazu Pita',
                        image: '/images/salad-bowl.webp',
                        labels: ['glutenhaltig'],
                        vegetarian: true,
                        vegan: false
                    },
                
                ]
            },
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
        const banner = document.getElementById('tageskarte-banner');
        if (menuType === 'tageskarte') {
            banner.style.display = 'block';
        } else {
            banner.style.display = 'none';
        }
        
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
            'Signature Drinks': 'fas fa-martini-glass',
            'Kalte Vorspeisen': 'fas fa-snowflake',
            'Warme Meze': 'fas fa-fire',
            'Käse Spezialitäten': 'fas fa-cheese',
            'Maritime Vorspeisen': 'fas fa-fish',
            'Etwas zum Tunken': 'fa-solid fa-bread-slice',
            'Suppen': 'fa-solid fa-bowl-food',
            'Garden of Greece': 'fas fa-leaf',
            'Vegetarisch': 'fas fa-leaf',
            'Fleisch': 'fa-solid fa-bacon',
            'Gyros und Grillspezialitäten': 'fas fa-fire-flame-curved',
            'Gemischte Fleischplatten vom grill': 'fas fa-drumstick-bite',
            'Schnitzel': 'fas fa-cutlery',
            'Authentische griechische Küche': 'fas fa-home',
            'Pfännchen-Spezialitäten': 'fas fa-pot',
            'Überbackenes': 'fas fa-cheese',
            'Für unsere kleinen Helden': 'fa-solid fa-child-reaching',
            'Fische': 'fas fa-fish',
            'Eisbecher': 'fa-solid fa-ice-cream',
            'Burger-Laune': 'fa-solid fa-burger',
            'Beilagen': 'fas fa-plate-wheat',
            'Saucen': 'fas fa-bottle-droplet',
            'Desserts': 'fas fa-cake-candles',
            'Wein': 'fas fa-wine-bottle',
            'Roséweine': 'fas fa-wine-bottle',
            'Rotweine': 'fas fa-wine-bottle',
            'Kaffee & Tee': 'fas fa-mug-hot',
            'Alkoholfrei': 'fas fa-glass-water',
            'Säfte': 'fas fa-glass-citrus',
            'Fassbier': 'fas fa-beer-mug-empty',
            'Bier': 'fas fa-beer',
            'Longdrinks': 'fas fa-martini-glass',
            'Spirituosen': 'fas fa-whiskey-glass',
            'Schorlen': 'fas fa-glass-water-droplet',
            'Flaschen-Weissweine': 'fas fa-wine-bottle',
            'Flaschen-Roséweine': 'fas fa-wine-bottle',
            'Flaschenrotweine': 'fas fa-wine-bottle',
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

    createMixedSaladInfo() {
        const infoBox = document.createElement('div');
        infoBox.className = 'mixed-salad-info';
        
        infoBox.innerHTML = `
            <div class="info-icon">
                <i class="fas fa-leaf"></i>
            </div>
            <h3>Gemischter Salat als Beilage</h3>
            <p>Zu jedem Hauptgericht können Sie einen frischen gemischten Salat für nur <span class="price-highlight">4,00€</span> dazu bestellen.</p>
        `;
        
        return infoBox;
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
                        <div class="item-icon">
                            <i class="fas fa-utensils"></i>
                        </div>
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
                            <p>Fotos sind bald verfügbar </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    //                             <img src="${item.image}" alt="${item.name}" loading="lazy">

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

function initPhoneCallHandlers() {
    const reservationBtns = document.querySelectorAll('.reservation-btn');
    reservationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = 'tel:03315506743';
        });
    });
}