# Bursa Uludağ Üniversitesi Yolları Görselleştirme ve Dijkstra Algoritması

![Language: Javascript](https://img.shields.io/badge/Language-Javascript-yellow.svg)
![Data: OpenStreetMap](https://img.shields.io/badge/Data-OpenStreetMap-blue.svg)

## Proje Hakkında

Bu proje, **Bursa Uludağ Üniversitesi**'nin kampüs içindeki yolları görselleştirerek **Dijkstra algoritması** ile en kısa yolu bulan bir uygulamadır. Trafik verisi kullanarak en kısa yol hesaplanabilir ya da trafik faktörü göz ardı edilebilir. 

Proje, **OpenStreetMap**'ten alınan harita verilerini kullanarak, çeşitli verileri ve algoritmaları entegre etmektedir. Başlangıç ve bitiş noktaları seçildiğinde, algoritma bu iki nokta arasındaki en kısa yolu, trafik durumuna göre veya trafik dikkate alınmadan hesaplar.

### Özellikler:
- OpenStreetMap haritası üzerinde **Bursa Uludağ Üniversitesi**'nin yolları görselleştirilir.
- Trafiğe duyarlı veya duyarsız en kısa yol hesaplaması yapılabilir.
- **Dijkstra algoritması** kullanılarak, yolculuk için en uygun güzergah bulunur.
- Harita üzerinde, seçilen başlangıç ve bitiş noktaları ile yol çizimi yapılır.

## Başlangıç

Projeyi çalıştırabilmek için aşağıdaki adımları izleyebilirsiniz:

### Gereksinimler
- Web tarayıcısı
- **Internet bağlantısı** (OpenStreetMap verileri için)

### Kurulum Adımları
1. Bu repository'i klonlayın veya zip dosyasını indirin:
   ```bash
   git clone https://github.com/kullaniciAdi/dataStructure-Project.git
   ```
1. clonlanan dosyayı açın veya indirilen dosyayı zipden çıkarın.
   ```bash
   index.html dosyasınızı varsayılan tarayıcınız ile açın.
   ```

## TODO

- [x] Add University Map implementation by openstreetmap
- [x] Limit map zoom and bounds
- [x] Add Queue,Stack and Graph Data Structues
- [x] Test map for nodes
  - [x] Draw buildings for test
- [x] Add building Coords | datas.js
- [x] Add Nodes with traffic coeff | datas.js
- [x] Style index.html 
  - [x] Add leaflet css 
  - [x] Add buttons, textboxs, labes to index.html
- [x] import nodes to function
- [x] test node print by getGraph()
- [x] test dijkstra algorithm by nodes
- [x] show dijkstra algoritm results on map
- [x] draw path information which is defined by dijkstra
- [x] add time benchmark for dijkstra
- [x] show benchmark result as a alertbox via button
- [x] add visualize 

# LIBRARYS and DATAS
<li>leaflet</li>
<li>tile.openstreetmap</li>
<li>SpeechSynthesisUtterance</li>

# Algorithms and data structures
<li>dijkstra</li>
<li>Queue</li>
<li>Graph</li>
<li>Set</li>
<li>Array</li>



## Dijkstra Algoritması

Dijkstra algoritması, ağırlıklı bir grafikteki başlangıç düğümünden (start) bitiş düğümüne (end) en kısa yolu bulur.

**Nasıl Çalışır?**

1.  Başlangıç düğümünün mesafesini 0, diğer tüm düğümlerin mesafesini sonsuz olarak ayarlar.
2.  Ziyaret edilmemiş düğümleri takip etmek için bir küme (veya kuyruk) kullanır.
3.  Her adımda, en küçük geçici mesafeye sahip ziyaret edilmemiş düğümü seçer.
4.  Seçilen düğümün komşularının mesafesini günceller. Eğer başlangıç düğümünden komşuya olan yeni yol mevcut yoldan daha kısaysa, mesafe güncellenir.
5.  Bitiş düğümü ziyaret edilene veya tüm erişilebilir düğümler işlenene kadar bu adımlar tekrarlanır.
6.  En kısa yol, geriye doğru izlenerek (previous düğümleri kullanılarak) oluşturulur.

**Algoritma Karmaşıklığı:**


* **Küme (basit uygulama):** $\mathcal{O}(V^2 + E)$ burada $V$ düğüm sayısı ve $E$ kenar sayısıdır.

**Kullanılan Veri Yapıları:**

* **`distances` nesnesi:** Her düğüme olan en kısa mesafeyi saklar.
* **`previous` nesnesi:** En kısa yolda bir önceki düğümü saklar. Bu, en kısa yolu yeniden oluşturmak için kullanılır.
* **`queue` (Öncelik Kuyruğu):** Ziyaret edilecek düğümleri, mevcut en kısa mesafeye göre sıralı tutar. Algoritmanın verimliliği için kritik bir veri yapısıdır. Basit bir dizi kullanıldığında $\mathcal{O}(V)$ zaman alır, ancak ikili yığın veya Fibonacci yığını kullanılarak bu süre optimize edilebilir.

Bu özet, algoritmanın temel işleyişini, karmaşıklığını ve kullandığı ana veri yapılarını anlamanıza yardımcı olacaktır.


