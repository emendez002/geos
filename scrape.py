import requests
from bs4 import BeautifulSoup
import json
import os

categories_urls = {
    'Topográficos': 'https://geos.market/categoria-producto/topograficos/',
    'Hidrología': 'https://geos.market/categoria-producto/hidrologia/',
    'Equipos Rugged': 'https://geos.market/categoria-producto/equipos-rugged-2/',
    'Drones': 'https://geos.market/categoria-producto/drones/',
    'Software': 'https://geos.market/categoria-producto/software/',
}

products_db = {}

for cat_name, url in categories_urls.items():
    print(f"Scraping {cat_name} from {url}")
    try:
        res = requests.get(url, timeout=10)
        soup = BeautifulSoup(res.text, 'html.parser')
        products = []
        
        for item in soup.select('li.product'):
            title_el = item.select('.woocommerce-loop-product__title') or item.select('h2.woocommerce-loop-product__title')
            title = title_el[0].text.strip() if title_el else "Producto"
            
            img_el = item.select('img')
            img_url = img_el[0].get('src') if img_el else ""
            if "data:image" in img_url and img_el[0].has_attr('data-lazy-src'):
                img_url = img_el[0].get('data-lazy-src')
            if img_el and not img_url:
                img_url = img_el[0].get('data-src', '')
            
            products.append({
                'name': title,
                'image': img_url,
                'description': 'Tecnología de última generación para tus proyectos.'
            })
            
        products_db[cat_name] = products
    except Exception as e:
        print(f"Error scraping {cat_name}: {e}")

os.makedirs('src/data', exist_ok=True)
with open('src/data/products.json', 'w', encoding='utf-8') as f:
    json.dump(products_db, f, ensure_ascii=False, indent=2)

print("Scraping completed!")
