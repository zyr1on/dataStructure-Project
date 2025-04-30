const buildings = [
    { name: "üniversite ana giriş", coords: [40.21925, 28.879861] },
    { name: "İBF C Blok", coords: [40.227861, 28.873917] },
    { name: "Kampüs Kafe", coords: [40.229889, 28.872639] },
    { name: "Uü Güzel Sanatlar Fakültesi", coords: [40.221556, 28.875694] },
    { name: "Tıp Fakültesi", coords: [40.219778, 28.869111] },
    { name: "Göz Hastanesi", coords: [40.223306, 28.868778] },
    { name: "Afet Acil Durum", coords: [40.221611, 28.872139] },
    { name: "Uü Camii", coords: [40.223167, 28.870667] },
    { name: "Uü Derslik ve Merkez Birimler", coords: [40.220917, 28.862083] },
    { name: "Rektörlük", coords: [40.221222, 28.867639] },
    { name: "Metro", coords: [40.218667, 28.870056] },
    { name: "Uni+Sports", coords: [40.218972, 28.865] },
    { name: "Daichii  Arge", coords: [40.221417, 28.860389] },
    { name: "Ulutek", coords: [40.222806, 28.859639] },
    { name: "Uü Kütüphane", coords: [40.225889, 28.872389] },
    { name: "David People", coords: [40.226556, 28.871944] },
    { name: "Fen Fak", coords: [40.222556, 28.863833] },
    { name: "Mete Cengiz", coords: [40.222694, 28.866389] },
    { name: "Veterinerlik Fak", coords: [40.229639, 28.876] },
    { name: "Endüstri Müh", coords: [40.227694, 28.876889] },
    { name: "Makina Müh", coords: [40.227222, 28.875944] },
    { name: "Mimarlık Fak", coords: [40.227583, 28.876694] },
    { name: "Otomotiv Müh", coords: [40.227, 28.875611] },
    { name: "İBF A ve B blok", coords: [40.226611, 28.874778] },
    { name: "Sağlık yüksek Okulu", coords: [40.225444, 28.875944] },
    { name: "Elektrik Tekstil Bilgisayar Müh", coords: [40.225139, 28.875278] },
    { name: "Çevre Müh", coords: [40.226861, 28.877472] },
    { name: "Makina topl.", coords: [40.226444, 28.876639] },
    { name: "Eğitim Fak", coords: [40.2244445, 28.8766945] },
    { name: "İnşaat Fak", coords: [40.2227223, 28.8768889] },
    { name: "Yurtlar Bölg", coords: [40.228722, 28.870861] },
    { name: "Güzel sanatlar", coords: [40.227639, 28.862083] },
    { name: "Kestirme", coords: [40.2277778, 28.8631389] },
    { name: "BasımEviMüdürlüğü", coords: [40.2245556, 28.8619722]},
    { name: "ZiraatMühendisliği", coords: [40.2260834, 28.86275]},
    { name: "Besaş", coords: [40.2281945, 28.8587778] },
    { name: "Çıkış", coords: [40.228611, 28.854833] },
    { name: "Ar1", coords: [40.2195, 28.87775] },
    { name: "Ar2", coords: [40.222278, 28.875056] },
    { name: "Ar3", coords: [40.220972, 28.872694] },
    { name: "Ar4", coords: [40.223917, 28.869861] },
    { name: "Ar5", coords: [40.222111, 28.866917] },
    { name: "Ar6", coords: [40.219389, 28.862167] },
    { name: "Ar7", coords: [40.221194, 28.862139] },
    { name: "Ar8", coords: [40.222, 28.862528] },
    { name: "Ar9", coords: [40.2235, 28.865528] },
    { name: "Ar10", coords: [40.21925, 28.8695] },
    { name: "Ar11", coords: [40.223833, 28.873861] },
    { name: "Ar12", coords: [40.2262223, 28.8721667] },
    { name: "Ar13", coords: [40.22725, 28.872278] },
    { name: "Ar14", coords: [40.227028, 28.87225] },
    { name: "Ar15", coords: [40.230889, 28.875028] },
    { name: "Ar16", coords: [40.227972, 28.877444] },
    { name: "Ar17", coords: [40.22725, 28.878222] },
    { name: "UET", coords: [40.226222, 28.876111] },
    { name: "Ar18", coords: [40.226556, 28.877] },
    { name: "Ar19", coords: [40.2261111, 28.8773889] },
    { name: "Ar20", coords: [40.2248056, 28.8746111] },
    { name: "Ar21", coords: [40.224611, 28.874222] },
    { name: "Ar22", coords: [40.223944, 28.873722] },
    { name: "Ar23", coords: [40.2240278, 28.8756389] },
    { name: "Ar24", coords: [40.2297778, 28.8721111] },
    { name: "Ar25", coords: [40.2285, 28.870806] },
    { name: "Ar26", coords: [40.228611, 28.870444] },
    { name: "Ar27", coords: [40.227139, 28.859639] },
    { name: "Ar28", coords: [40.2274723, 28.8590556] },
    { name: "Ar30", coords: [40.2252223, 28.8686111]},
    { name: "Ar29", coords: [40.2239723, 28.86225]},
    { name: "Ar31", coords: [40.2264167, 28.8707223]}  
];

// const adjacency = 
//     { 
//         "Ar11": { "Uü Kütüphane": 150, "Ar22": 20, "Ar21": 100, "Ar2": 200 },
//         "Uü Kütüphane": { "Ar11": 150, "David People": 80 },
//         "David People": { "Uü Kütüphane": 80, "Ar12": 50,"Ar14":150},
//         "Ar12": { "David People": 50, "Uü Kütüphane": 80 },
//         "Ar13": { "Ar14": 40, "İBF C Blok": 100 },
//         "Ar14": { "Ar13": 40, "Ar12": 70,"Kampüs Kafe":200,"David People":150 },
//         "İBF C Blok": { "Ar13": 100, "Kampüs Kafe": 200 },
//         "Kampüs Kafe": { "Ar14": 200, "Ar15": 250 ,"Ar24":100},
//         "Ar15": { "Kampüs Kafe": 250, "Veterinerlik Fak": 100 },
//         "Veterinerlik Fak": { "Ar15": 100, "Ar16": 300 },
//         "Ar16": { "Veterinerlik Fak": 300, "Endüstri Müh": 120,"Ar17":200 },
//         "Endüstri Müh": { "Ar16": 120, "Makina Müh": 80, "Mimarlık Fak": 90 },
//         "Makina Müh": { "Endüstri Müh": 80, "Otomotiv Müh": 70 },
//         "Mimarlık Fak": { "Endüstri Müh": 90 },
//         "Otomotiv Müh": { "Makina Müh": 70, "İBF A ve B blok": 150 },
//         "İBF A ve B blok": { "Otomotiv Müh": 150 },
//         "Ar17": { "Çevre Müh": 80 ,"Ar16":200},
//         "Çevre Müh": { "Ar17": 80, "Makina topl.": 60,"Ar18":60 },
//         "Makina topl.": { "Çevre Müh": 60, "UET": 70 },
//         "UET": { "Makina topl.": 70, "Ar18": 90 },
//         "Ar18": { "UET": 90, "Ar19": 50, "Makina topl.": 70, "Çevre Müh": 60 },
//         "Ar19": { "Ar18": 50, "Sağlık yüksek Okulu": 120 ,"Ar18":50},
//         "Sağlık yüksek Okulu": { "Ar19": 120, "Elektrik Tekstil Bilgisayar Müh": 100},
//         "Elektrik Tekstil Bilgisayar Müh": { "Sağlık yüksek Okulu": 100, "Ar20": 60 },
//         "Ar20": { "Elektrik Tekstil Bilgisayar Müh": 60, "Ar21": 50,"Ar23": 80},
//         "Ar21": { "Ar20": 50, "Ar11": 100 },
//         "Ar22": { "Ar11": 120, "Ar23": 150 },
//         "Ar23": {  "Eğitim Fak": 80 ,"Ar20": 80,"İnşaat Fak":300},
//         "Eğitim Fak": { "Ar23": 80 },
//         "İnşaat Fak": { "Ar23": 300 },
//         "üniversite ana giriş": { "Ar1": 200 },
//         "Ar1": { "üniversite ana giriş": 200, "Uü Güzel Sanatlar Fakültesi": 250, "Ar2": 300 },
//         "Uü Güzel Sanatlar Fakültesi": { "Ar1": 250, "Ar2": 220 },
//         "Ar2": { "Uü Güzel Sanatlar Fakültesi": 220, "Ar3": 270, "Ar1": 300, "Ar11": 200 },
//         "Ar3": { "Ar2": 270, "Afet Acil Durum": 100, "Uü Camii": 200, "Ar10": 210 },
//         "Uü Camii": { "Afet Acil Durum": 250, "Ar4": 200, "Ar3": 200 },
//         "Ar4": { "Uü Camii": 200, "Göz Hastanesi": 180, "Ar5": 220 },
//         "Göz Hastanesi": { "Ar4": 180, "Ar5": 220 },
//         "Ar5": { "Göz Hastanesi": 220, "Mete Cengiz": 180, "Rektörlük": 220 },
//         "Mete Cengiz": { "Ar5": 180, "Ar9": 180 },
//         "Fen Fak": {  "Ar8": 160 ,"Ar9 ":250},
//         "Ar8": { "Fen Fak": 160, "Uü Derslik ve Merkez Birimler": 170 ,"Ar29":125},
//         "Uü Derslik ve Merkez Birimler": { "Ar8": 170, "Ar6": 150 },
//         "Ar6": { "Uü Derslik ve Merkez Birimler": 150, "Uni+Sports": 180, "Ar7": 200 },
//         "Uni+Sports": { "Ar6": 180, "Metro": 160 },
//         "Metro": { "Uni+Sports": 160, "Tıp Fakültesi": 150, "Ar10": 150 },
//         "Tıp Fakültesi": { "Metro": 150, "Rektörlük": 250, "Ar10": 90 },
//         "Rektörlük": { "Tıp Fakültesi": 250, "Ar9": 200 ,"Ar5":220},
//         "Ar9": { "Rektörlük": 200, "Mete Cengiz": 180 ,"Fen Fak":250},
//         "Daichii  Arge": { "Ar7": 180, "Ulutek": 180 },
//         "Ar7": { "Daichii  Arge": 180, "Ar6": 200 },
//         "Ulutek": { "Daichii  Arge": 180 },
//         "Ar10": { "Uü Camii": 120, "Tıp Fakültesi": 90, "Ar3": 210, "Metro": 150 },
//         "Ar24": { "Kampüs Kafe": 100, "Yurtlar Bölg": 200 },
//         "Yurtlar Bölg": { "Ar24": 200, "Ar25": 50 },
//         "Ar25": { "Yurtlar Bölg": 50 ,"AR26":60},
//         "Kestirme": {  "Ar26": 200 ,"Güzel sanatlar":100 ,"ZiraatMühendisliği":145},
//         "Ar26": { "Kestirme": 200, "Ar25": 60 },
//         "Güzel sanatlar": {  "Ar27": 100,"Kestirme":100 },
//         "Ar27": { "Güzel sanatlar": 100, "Ar28": 100 },
//         "Ar28": { "Ar27": 100, "Besaş": 50 },
//         "Besaş": { "Ar28": 50, "Çıkış": 200 },
//         "Çıkış": { "Besaş": 200 },
//         "Ar29" :{ "BasımEviMüdürlüğü":40,"Ar8":125},
//         "BasımEviMüdürlüğü" :{ "Ar29":40,"ZiraatMühendisliği":95},
//         "ZiraatMühendisliği" :{ "BasımEviMüdürlüğü":95,"Kestirme":145},
//         "Ar30" :{ "Ar9":100,"Ar31":125},
//         "Ar31" :{ "Ar30":125,"Ar25":125,"Ar13":120},
//         "Afet Acil Durum":{ "Ar3":100, "Uü Camii":250}
//  };



const adjacency = 
    { 
        "Ar11": { 
            "Uü Kütüphane": { distance: 150, traffic: 2 }, 
            "Ar22": { distance: 20, traffic: 1 }, 
            "Ar21": { distance: 100, traffic: 3 }, 
            "Ar2": { distance: 200, traffic: 5 } 
        },
        "Uü Kütüphane": { 
            "Ar11": { distance: 150, traffic: 2 }, 
            "Ar12": { distance: 80, traffic: 1 } 
        },
        "David People": { 
             
            "Ar12": { distance: 50, traffic: 1 },
            "Ar14": { distance: 150, traffic: 4 }
        },
        "Ar12": { 
            "David People": { distance: 50, traffic: 1 }, 
            "Uü Kütüphane": { distance: 70, traffic: 2 } 
        },
        "Ar13": { 
            "Ar14": { distance: 40, traffic: 1 }, 
            "İBF C Blok": { distance: 100, traffic: 7 } 
        },
        "Ar14": { 
            "Ar13": { distance: 40, traffic: 1 }, 
            "Ar12": { distance: 70, traffic: 2 },
            "Kampüs Kafe": { distance: 200, traffic: 6 },
            "David People": { distance: 150, traffic: 4 }
        },
        "İBF C Blok": { 
            "Ar13": { distance: 100, traffic: 7 }, 
            "Kampüs Kafe": { distance: 200, traffic: 8 } 
        },
        "Kampüs Kafe": { 
            "Ar14": { distance: 200, traffic: 6 }, 
            "Ar15": { distance: 250, traffic: 3 },
            "Ar24": { distance: 100, traffic: 3 }
        },
        "Ar15": { 
            "Kampüs Kafe": { distance: 250, traffic: 3 }, 
            "Veterinerlik Fak": { distance: 100, traffic: 2 } 
        },
        "Veterinerlik Fak": { 
            "Ar15": { distance: 100, traffic: 2 }, 
            "Ar16": { distance: 300, traffic: 5 } 
        },
        "Ar16": { 
            "Veterinerlik Fak": { distance: 300, traffic: 5 }, 
            "Endüstri Müh": { distance: 120, traffic: 4 },
            "Ar17": { distance: 200, traffic: 2 },
            "Mimarlık Fak":{ distance: 85, traffic: 4 }
        },
        "Endüstri Müh": { 
            "Ar16": { distance: 120, traffic: 4 }, 
            "Makina Müh": { distance: 80, traffic: 6 }, 
            "Mimarlık Fak": { distance: 90, traffic: 3 } 
        },
        "Makina Müh": { 
            "Endüstri Müh": { distance: 80, traffic: 6 }, 
            "Otomotiv Müh": { distance: 70, traffic: 4 },
             "Mimarlık Fak": { distance: 70, traffic: 4 }
        },
        "Mimarlık Fak": { 
            "Endüstri Müh": { distance: 90, traffic: 3 }, 
            "Makina Müh": { distance: 70, traffic: 4 },
            "Ar16":{ distance: 85, traffic: 4 }
        },
        "Otomotiv Müh": { 
            "Makina Müh": { distance: 70, traffic: 4 }, 
            "İBF A ve B blok": { distance: 150, traffic: 7 } 
        },
        "İBF A ve B blok": { 
            "Otomotiv Müh": { distance: 150, traffic: 7 } 
        },
        "Ar17": { 
            "Çevre Müh": { distance: 80, traffic: 2 },
            "Ar16": { distance: 200, traffic: 2 }
        },
        "Çevre Müh": { 
            "Ar17": { distance: 80, traffic: 2 }, 
            "Makina topl.": { distance: 60, traffic: 3 },
            "Ar18": { distance: 60, traffic: 2 }
        },
        "Makina topl.": { 
            "Çevre Müh": { distance: 60, traffic: 3 }, 
            
            "UET": { distance: 70, traffic: 4 } 
        },
        "UET": { 
            "Makina topl.": { distance: 70, traffic: 4 }, 
            "Ar18": { distance: 90, traffic: 5 } 
        },
        "Ar18": { 
            "UET": { distance: 90, traffic: 5 }, 
            "Ar19": { distance: 50, traffic: 2 }, 
            "Makina topl.": { distance: 70, traffic: 3 }, 
            "Çevre Müh": { distance: 60, traffic: 2 } 
        },
        "Ar19": { 
            "Ar18": { distance: 50, traffic: 2 }, 
            "Sağlık yüksek Okulu": { distance: 120, traffic: 6 }
        },
        "Sağlık yüksek Okulu": { 
            "Ar19": { distance: 120, traffic: 6 }, 
            "Elektrik Tekstil Bilgisayar Müh": { distance: 100, traffic: 7 }
        },
        "Elektrik Tekstil Bilgisayar Müh": { 
            "Sağlık yüksek Okulu": { distance: 100, traffic: 7 }, 
            "Ar20": { distance: 60, traffic: 3 } 
        },
        "Ar20": { 
            "Elektrik Tekstil Bilgisayar Müh": { distance: 60, traffic: 3 }, 
            "Ar21": { distance: 50, traffic: 2 },
            "Ar23": { distance: 80, traffic: 4 }
        },
        "Ar21": { 
            "Ar20": { distance: 50, traffic: 2 }, 
            "Ar11": { distance: 100, traffic: 3 } 
        },
        "Ar22": { 
            "Ar11": { distance: 120, traffic: 1 }, 
            
        },
        "Ar23": {  
            "Eğitim Fak": { distance: 80, traffic: 6 },
            "Ar20": { distance: 80, traffic: 4 },"İnşaat Fak":{distance: 300, traffic: 4}
        },
        "Eğitim Fak": { 
            "Ar23": { distance: 80, traffic: 6 } 
        },
        "İnşaat Fak": { 
            "Ar23": { distance: 300, traffic: 4 } 
        },
        "üniversite ana giriş": { 
            "Ar1": { distance: 200, traffic: 9 } 
        },
        "Ar1": { 
            "üniversite ana giriş": { distance: 200, traffic: 9 }, 
            "Uü Güzel Sanatlar Fakültesi": { distance: 250, traffic: 5 }, 
            "Ar2": { distance: 300, traffic: 2 } 
        },
        "Uü Güzel Sanatlar Fakültesi": { 
            "Ar1": { distance: 250, traffic: 5 }, 
            "Ar2": { distance: 220, traffic: 3 } 
        },
        "Ar2": { 
            "Uü Güzel Sanatlar Fakültesi": { distance: 220, traffic: 3 }, 
            "Ar3": { distance: 270, traffic: 4 }, 
            "Ar1": { distance: 300, traffic: 2 }, 
            "Ar11": { distance: 200, traffic: 5 } 
        },
        "Ar3": { 
            "Ar2": { distance: 270, traffic: 4 }, 
            "Afet Acil Durum": { distance: 100, traffic: 1 }, 
            "Uü Camii": { distance: 200, traffic: 4 }, 
            "Ar10": { distance: 210, traffic: 6 } 
        },
        "Uü Camii": { 
            "Afet Acil Durum": { distance: 250, traffic: 4 }, 
            "Ar4": { distance: 200, traffic: 2 }, 
            "Ar3": { distance: 200, traffic: 4 } 
        },
        "Ar4": { 
            "Uü Camii": { distance: 200, traffic: 2 }, 
            "Göz Hastanesi": { distance: 180, traffic: 3 }, 
            "Ar5": { distance: 220, traffic: 2 } 
        },
        "Göz Hastanesi": { 
            "Ar4": { distance: 180, traffic: 3 }, 
            "Ar5": { distance: 220, traffic: 5 } 
        },
        "Ar5": { 
            "Göz Hastanesi": { distance: 220, traffic: 5 }, 
            "Mete Cengiz": { distance: 180, traffic: 4 }, 
            "Rektörlük": { distance: 220, traffic: 6 } 
        },
        "Mete Cengiz": { 
            "Ar5": { distance: 180, traffic: 4 }, 
            "Ar9": { distance: 180, traffic: 3 } 
        },
        "Fen Fak": {  
            "Ar8": { distance: 160, traffic: 4 },
            "Ar9": { distance: 250, traffic: 3 }
        },
        "Ar8": { 
            "Fen Fak": { distance: 160, traffic: 4 }, 
            "Uü Derslik ve Merkez Birimler": { distance: 170, traffic: 7 },
            "Ar29": { distance: 125, traffic: 2 }
        },
        "Uü Derslik ve Merkez Birimler": { 
            "Ar8": { distance: 170, traffic: 7 }, 
            "Ar6": { distance: 150, traffic: 5 } 
        },
        "Ar6": { 
            "Uü Derslik ve Merkez Birimler": { distance: 150, traffic: 5 }, 
            "Uni+Sports": { distance: 180, traffic: 3 }, 
            "Ar7": { distance: 200, traffic: 2 } 
        },
        "Uni+Sports": { 
            "Ar6": { distance: 180, traffic: 3 }, 
            "Metro": { distance: 160, traffic: 7 } 
        },
        "Metro": { 
            "Uni+Sports": { distance: 160, traffic: 7 }, 
            "Tıp Fakültesi": { distance: 150, traffic: 8 }, 
            "Ar10": { distance: 150, traffic: 6 } 
        },
        "Tıp Fakültesi": { 
            "Metro": { distance: 150, traffic: 8 }, 
            "Rektörlük": { distance: 250, traffic: 7 }, 
            "Ar10": { distance: 90, traffic: 4 } 
        },
        "Rektörlük": { 
            "Tıp Fakültesi": { distance: 250, traffic: 7 }, 
            "Ar9": { distance: 200, traffic: 5 },
            "Ar5": { distance: 220, traffic: 6 }
        },
        "Ar9": { 
            "Rektörlük": { distance: 200, traffic: 5 }, 
            "Mete Cengiz": { distance: 180, traffic: 3 },
            "Fen Fak": { distance: 250, traffic: 3 }
        },
        "Daichii  Arge": { 
            "Ar7": { distance: 180, traffic: 1 }, 
            "Ulutek": { distance: 180, traffic: 2 } 
        },
        "Ar7": { 
            "Daichii  Arge": { distance: 180, traffic: 1 }, 
            "Ar6": { distance: 200, traffic: 2 } 
        },
        "Ulutek": { 
            "Daichii  Arge": { distance: 180, traffic: 2 } 
        },
        "Ar10": { 
            "Uü Camii": { distance: 120, traffic: 3 }, 
            "Tıp Fakültesi": { distance: 90, traffic: 4 }, 
            "Ar3": { distance: 210, traffic: 6 }, 
            "Metro": { distance: 150, traffic: 6 } 
        },
        "Ar24": { 
            "Kampüs Kafe": { distance: 100, traffic: 3 }, 
            "Yurtlar Bölg": { distance: 200, traffic: 8 } 
        },
        "Yurtlar Bölg": { 
            "Ar24": { distance: 200, traffic: 8 }, 
            "Ar25": { distance: 50, traffic: 9 } 
        },
        "Ar25": { 
            "Yurtlar Bölg": { distance: 50, traffic: 9 },
            "Ar26": { distance: 60, traffic: 4 }
        },
        "Kestirme": {  
            "Ar26": { distance: 200, traffic: 2 },
            "Güzel sanatlar": { distance: 100, traffic: 3 },
            "ZiraatMühendisliği": { distance: 145, traffic: 4 }
        },
        "Ar26": { 
            "Kestirme": { distance: 200, traffic: 2 }, 
            "Ar25": { distance: 60, traffic: 4 } 
        },
        "Güzel sanatlar": {  
            "Ar27": { distance: 100, traffic: 2 },
            "Kestirme": { distance: 100, traffic: 3 }
        },
        "Ar27": { 
            "Güzel sanatlar": { distance: 100, traffic: 2 }, 
            "Ar28": { distance: 100, traffic: 1 } 
        },
        "Ar28": { 
            "Ar27": { distance: 100, traffic: 1 }, 
            "Besaş": { distance: 50, traffic: 3 } 
        },
        "Besaş": { 
            "Ar28": { distance: 50, traffic: 3 }, 
            "Çıkış": { distance: 200, traffic: 9 } 
        },
        "Çıkış": { 
            "Besaş": { distance: 200, traffic: 9 } 
        },
        "Ar29": { 
            "BasımEviMüdürlüğü": { distance: 40, traffic: 1 },
            "Ar8": { distance: 125, traffic: 2 }
        },
        "BasımEviMüdürlüğü": { 
            "Ar29": { distance: 40, traffic: 1 },
            "ZiraatMühendisliği": { distance: 95, traffic: 2 }
        },
        "ZiraatMühendisliği": { 
            "BasımEviMüdürlüğü": { distance: 95, traffic: 2 },
            "Kestirme": { distance: 145, traffic: 4 }
        },
        "Ar30": { 
            "Ar9": { distance: 100, traffic: 2 },
            "Ar31": { distance: 125, traffic: 3 }
        },
        "Ar31": { 
            "Ar30": { distance: 125, traffic: 3 },
            "Ar25": { distance: 125, traffic: 5 },
            "Ar13": { distance: 120, traffic: 4 }
        },
        "Afet Acil Durum": { 
            "Ar3": { distance: 100, traffic: 1 }, 
            "Uü Camii": { distance: 250, traffic: 4 }
        }
    };

// Eski algoritmanın kullanabilmesi için uyumluluk katmanı
const legacyAdjacency = {};
for (const source in adjacency) {
    legacyAdjacency[source] = {};
    for (const target in adjacency[source]) {
        legacyAdjacency[source][target] = adjacency[source][target].distance;
    }
}
