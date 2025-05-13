proje linki: https://github.com/zyr1on/dataStructure-Project<br>
projenin backend eklenmiş hali: https://github.com/ahsayilmaz/CampusNavigation<br>
proje domain: <a href="campusnavigation.up.railway.app">campusnavigation</a><br>

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
Zip dosyasını indirip index.html açarak da kolay bir yoldan projeye ulaşabilirsiniz.

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

- [x] test html page
- [x] Add University Map implementation by openstreetmap
- [x] Add leaflet
- [x] Limit map zoom and bounds
- [x] Add Queue,Stack and Graph Data Structues
- [x] Test map for nodes
  - [x] Draw buildings for test
- [x] Add building Coords | datas.js
- [x] Add Nodes with traffic coeff | datas.js
- [x] Style index.html 
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


# PriorityQueue (Min-Heap)

Bu proje, JavaScript diliyle yazılmış dinamik boyutlu bir min-heap tabanlı öncelik kuyruğu veri yapısını içerir.

## Özellikler

- Dinamik olarak büyüyebilen iç dizi
- Önceliğe göre otomatik sıralama (küçük değer daha yüksek öncelikli)
- `decreaseKey()` fonksiyonu ile Dijkstra gibi algoritmalarda kullanılabilir

## API

| Fonksiyon       | Açıklama                                                        | Zaman Karmaşıklığı |
|----------------|------------------------------------------------------------------|---------------------|
| `enqueue(node, priority)` | Yeni bir eleman kuyruğa ekler                                  | O(log n)            |
| `dequeue()`     | En düşük öncelikli elemanı kuyruktan çıkarır                    | O(log n)            |
| `decreaseKey(node, newPriority)` | Var olan bir elemanın önceliğini düşürür               | O(n) + O(log n)     |
| `isEmpty()`     | Kuyruk boş mu kontrol eder                                      | O(1)                |
| `print()`       | Kuyruktaki tüm elemanları bir dizi olarak döndürür              | O(n)                |




## Dijkstra Algoritması

Dijkstra algoritması, ağırlıklı bir grafikteki başlangıç düğümünden (start) bitiş düğümüne (end) en kısa yolu bulur.

**Nasıl Çalışır?**

1.  Başlangıç düğümünün mesafesini 0, diğer tüm düğümlerin mesafesini sonsuz olarak ayarlar.
2.  Ziyaret edilmemiş düğümleri takip etmek için bir küme (veya kuyruk) kullanır.
3.  Her adımda, en küçük geçici mesafeye sahip ziyaret edilmemiş düğümü seçer.
4.  Seçilen düğümün komşularının mesafesini günceller. Eğer başlangıç düğümünden komşuya olan yeni yol mevcut yoldan daha kısaysa, mesafe güncellenir.
5.  Bitiş düğümü ziyaret edilene veya tüm erişilebilir düğümler işlenene kadar bu adımlar tekrarlanır.
6.  En kısa yol, geriye doğru izlenerek (previous düğümleri kullanılarak) oluşturulur.

# Dijkstra Algoritması Zaman Karmaşıklığı

Dijkstra algoritması, bir kaynaktan diğer tüm düğümlere en kısa yolları bulur. Eğer algoritma bir **Priority Queue** (min-heap) kullanıyorsa, zaman karmaşıklığı şu şekilde hesaplanır:

Her adımda:
- **Kuyruğa Eleman Eklemek**: `O(log V)`
- **Kuyruğun En Küçük Elemanını Çıkarmak**: `O(log V)`
- **Mesafe Güncelleme**: `O(log V)`

Bu işlemler her düğüm ve kenar için yapılır. Bu nedenle, toplam zaman karmaşıklığı şu şekilde hesaplanır:

$$
O((V + E) \cdot \log V)
$$

Burada:
- **V**: Düğümlerin sayısı
- **E**: Kenarların sayısı

Bu karmaşıklık, **Priority Queue** kullanarak Dijkstra algoritmasının genel verimliliğini artırır ve büyük graf yapılarında performans sağlar.



## Dijkstra Benchmark Sonuçları
```js
benchmarkdijkstra(adjacency,"Ar1","Uü Kütüphane");
```
| Dijkstra          | İterasyonlar | Max Zaman (ms) | Ortalama Zaman (ms) | Standart Sapma (ms) |
|----------------|--------------|----------------|---------------------|---------------------|
| **Ar1-Uü Kütüphane**      | 1000         | 0.3000         | 0.0269              | 0.0493              |
| **üniversite ana giriş-Çıkış**      | 1000         | 0.4000         | 0.0147              | 0.0414              |
| **Yurtlar Bölg-Metro**      | 1000         | 0.4000         | 0.0226              | 0.0483              |

## Priority Queue Benchmark Sonuçları
```js
const pq = new PriorityQueue();
benchmarkPriorityQueue(pq, 1000);
```
| PriorityQueue          | İterasyonlar | Max Zaman (ms) | Ortalama Zaman (ms) | Standart Sapma (ms) |
|----------------|--------------|----------------|---------------------|---------------------|
| **Enqueue**    | 1000         | 0.1000         | 0.0003              | 0.0055              |
| **Dequeue**    | 1000         | 0.1000         | 0.0006              | 0.0077              |
| **SiftUp**     | 1000         | 0.1000         | 0.0003              | 0.0055              |
| **SiftDown**   | 1000         | 0.0000         | 0.0000              | 0.0000              |
| **DecreaseKey**| 1000         | 0.1000         | 0.0002              | 0.0045              |


