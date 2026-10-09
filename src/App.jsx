import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Check, ChevronDown, CreditCard, Heart, Instagram, Menu,
  Minus, PackageCheck, Plus, Search, ShieldCheck, ShoppingBag, Sparkles, Star,
  Trash2, Truck, UserRound, X, CircleHelp, Mail, Phone, MapPin
} from 'lucide-react';

const products = [
  { id: 1, brand: 'بريق', name: 'عطر روز بلوم', description: 'عطر زهري ناعم يرافقك طوال اليوم', price: 189, oldPrice: 229, category: 'العطور', rating: '4.9', reviews: 168, image: 0, badge: 'الأكثر حباً' },
  { id: 2, brand: 'بريق', name: 'مجموعة فرش اللمسة الناعمة', description: 'فرش مكياج ناعمة لتوزيع مثالي', price: 119, category: 'المكياج', rating: '4.8', reviews: 94, image: 1 },
  { id: 3, brand: 'بريق', name: 'كريم الترطيب الوردي', description: 'ترطيب يومي يمنح البشرة إشراقة صحية', price: 99, category: 'العناية بالبشرة', rating: '4.9', reviews: 216, image: 2, badge: 'جديد' },
  { id: 4, brand: 'بريق', name: 'لوشن نعومة الجسم', description: 'نعومة تدوم مع رائحة دافئة', price: 89, category: 'العناية بالجسم', rating: '4.7', reviews: 72, image: 3 },
  { id: 5, brand: 'بريق', name: 'فاونديشن سكين غلو', description: 'تغطية طبيعية ولمسة مضيئة', price: 139, oldPrice: 169, category: 'المكياج', rating: '4.8', reviews: 276, image: 4, badge: 'الأكثر مبيعاً' },
  { id: 6, brand: 'بريق', name: 'باليت ظلال نود', description: 'درجات يومية من الناعم إلى الجريء', price: 159, oldPrice: 199, category: 'المكياج', rating: '4.9', reviews: 412, image: 5, badge: 'الأكثر مبيعاً' },
  { id: 7, brand: 'بريق', name: 'سيروم الهايلورونيك', description: 'ترطيب عميق لبشرة نضرة', price: 79, category: 'العناية بالبشرة', rating: '4.7', reviews: 189, image: 6, badge: 'جديد' },
  { id: 8, brand: 'بريق', name: 'ماسكارا فول فوليوم', description: 'رموش أكثر كثافة من أول تمريرة', price: 109, oldPrice: 139, category: 'المكياج', rating: '4.8', reviews: 324, image: 7, badge: 'الأكثر مبيعاً' },
  { id: 9, brand: 'بريق', name: 'تونر الورد المهدئ', description: 'انتعاش لطيف بعد تنظيف البشرة', price: 69, category: 'العناية بالبشرة', rating: '4.8', reviews: 88, image: 8, badge: 'جديد' },
  { id: 10, brand: 'بريق', name: 'بلشر روزي جلو', description: 'لون وردي يمنح خدودك حيوية', price: 95, category: 'المكياج', rating: '4.9', reviews: 121, image: 9, badge: 'جديد' },
  { id: 11, brand: 'بريق', name: 'غسول البشرة اللطيف', description: 'تنظيف يومي يحافظ على راحة بشرتك', price: 75, category: 'العناية بالبشرة', rating: '4.7', reviews: 103, image: 10 },
  { id: 12, brand: 'بريق', name: 'روج ساتان روز', description: 'لون غني بلمسة ساتانية ناعمة', price: 85, category: 'المكياج', rating: '4.9', reviews: 156, image: 11, badge: 'جديد' }
];
const categories = [
  { name: 'العناية بالجسم', subtitle: 'نعومة تدوم طويلاً', image: 3 },
  { name: 'العناية بالبشرة', subtitle: 'إشراقة تبدأ من هنا', image: 2 },
  { name: 'المكياج', subtitle: 'إطلالة تشبهك', image: 1 },
  { name: 'العطور', subtitle: 'رائحة تحكي قصتك', image: 0 }
];
const navLinks = ['الرئيسية', 'المكياج', 'العناية بالبشرة', 'العطور', 'العروض'];
const infoCopy = {
  'من نحن': 'بريق مساحة للجمال اليومي. اخترنا لكِ تجربة تسوق ناعمة وواضحة، مع منتجات مكياج وعناية تناسب لحظاتكِ الجميلة.',
  'مساعدة': 'هل تحتاجين مساعدة؟ تواصلي معنا عبر البريد hello@bareeq.example. هذا المتجر حالياً نسخة عرض، وبيانات التواصل توضيحية.',
  'المدونة': 'قريباً: أفكار للعناية ببشرتكِ ونصائح مكياج بسيطة تلهم إطلالتكِ اليومية.',
  'الشحن والتوصيل': 'الشحن مجاني للطلبات بقيمة 299 ريال أو أكثر. تبلغ رسوم الشحن 25 ريال للطلبات الأقل من ذلك. الأسعار توضيحية في النسخة التجريبية.',
  'سياسة الإرجاع': 'يمكنكِ مراجعة سياسة الإرجاع النهائية عند إطلاق المتجر. هذه الواجهة نسخة تجريبية ولا تستقبل طلبات فعلية.',
  'الأسئلة الشائعة': 'تصفحي المنتجات، أضيفي ما يعجبكِ إلى السلة، وشاهدي خطوات الدفع التجريبية. لا تُرسل الطلبات من هذه النسخة.'
};

const money = (value) => `${new Intl.NumberFormat('ar-SA').format(value)} ر.س`;
const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };
const load = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

function ProductImage({ index, className = '' }) {
  return <div className={`product-image ${className}`} style={{ '--image-x': `${(index % 4) * 100 / 3}%`, '--image-y': `${Math.floor(index / 4) * 50}%` }} />;
}

function ProductCard({ product, isFavorite, onFavorite, onAdd, onOpen }) {
  return <article className="product-card">
    <div className="product-picture" onClick={() => onOpen(product)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onOpen(product)} aria-label={`عرض تفاصيل ${product.name}`}>
      <ProductImage index={product.image} />
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <button className={`favorite-button ${isFavorite ? 'selected' : ''}`} onClick={(e) => { e.stopPropagation(); onFavorite(product.id); }} aria-label={isFavorite ? `إزالة ${product.name} من المفضلة` : `إضافة ${product.name} للمفضلة`}><Heart size={19} fill={isFavorite ? 'currentColor' : 'none'} /></button>
    </div>
    <button className="product-name" onClick={() => onOpen(product)}>{product.name}</button>
    <p className="product-description">{product.description}</p>
    <div className="rating"><Star size={13} fill="currentColor" /> <span>{product.rating}</span><small>({product.reviews})</small></div>
    <div className="product-price">{money(product.price)} {product.oldPrice && <del>{money(product.oldPrice)}</del>}</div>
    <button className="add-button" onClick={() => onAdd(product)}><ShoppingBag size={17} /> أضيفي إلى السلة</button>
  </article>;
}

export default function App() {
  const [category, setCategory] = useState('الرئيسية');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [expanded, setExpanded] = useState(false);
  const [cart, setCart] = useState(() => load('bareeq-cart', []));
  const [favorites, setFavorites] = useState(() => load('bareeq-favorites', []));
  const [drawer, setDrawer] = useState(null);
  const [selected, setSelected] = useState(null);
  const [detailQty, setDetailQty] = useState(1);
  const [checkout, setCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [info, setInfo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => save('bareeq-cart', cart), [cart]);
  useEffect(() => save('bareeq-favorites', favorites), [favorites]);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 2900); return () => clearTimeout(timer); }, [toast]);
  useEffect(() => { document.body.style.overflow = drawer || selected || checkout || info || menuOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [drawer, selected, checkout, info, menuOpen]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [category, query, expanded]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (products.find((p) => p.id === item.id)?.price || 0) * item.qty, 0);
  const shippingCost = subtotal >= 299 || subtotal === 0 ? 0 : 25;
  const visibleProducts = useMemo(() => {
    let list = products.filter((product) => {
      const categoryMatch = category === 'الرئيسية' || (category === 'العروض' ? !!product.oldPrice : product.category === category);
      const queryMatch = `${product.name} ${product.brand} ${product.description} ${product.category}`.toLowerCase().includes(query.trim().toLowerCase());
      return categoryMatch && queryMatch;
    });
    if (sort === 'low') list.sort((a, b) => a.price - b.price);
    if (sort === 'high') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => Number(b.rating) - Number(a.rating));
    return list;
  }, [category, query, sort]);
  const shownProducts = category === 'الرئيسية' && !query && !expanded ? visibleProducts.slice(4, 12) : visibleProducts;

  const notify = (message) => setToast(message);
  const addToCart = (product, qty = 1) => {
    setCart((previous) => {
      const found = previous.find((item) => item.id === product.id);
      return found ? previous.map((item) => item.id === product.id ? { ...item, qty: item.qty + qty } : item) : [...previous, { id: product.id, qty }];
    });
    notify(`أضفنا ${product.name} إلى السلة`);
  };
  const changeQty = (id, delta) => setCart((previous) => previous.map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0));
  const toggleFavorite = (id) => setFavorites((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]);
  const selectCategory = (next) => { setCategory(next); setQuery(''); setExpanded(true); setMenuOpen(false); setMobileSearchOpen(false); next === 'الرئيسية' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : setTimeout(() => goTo('shop'), 50); };
  const openProduct = (product) => { setSelected(product); setDetailQty(1); };
  const closeLayers = () => { setDrawer(null); setSelected(null); setCheckout(false); setInfo(null); setMenuOpen(false); };

  return <>
    <div className="announcement"><div className="page-wrap announcement-inner"><div className="announcement-links"><button onClick={() => setInfo('من نحن')}>من نحن</button><button onClick={() => setInfo('مساعدة')}>مساعدة</button><button onClick={() => setInfo('المدونة')}>المدونة</button><span>السعودية / ر.س</span></div><div className="announcement-shipping"><Truck size={16} /> شحن مجاني للطلبات التي تزيد عن 299 ريال</div></div></div>
    <header className="site-header"><div className="page-wrap header-inner">
      <button className="mobile-menu-button icon-button" onClick={() => setMenuOpen(true)} aria-label="فتح القائمة"><Menu /></button>
      <nav className="main-nav" aria-label="القائمة الرئيسية">{navLinks.map((link) => <button key={link} className={category === link ? 'active' : ''} onClick={() => selectCategory(link)}>{link}</button>)}</nav>
      <button className="brand" onClick={() => selectCategory('الرئيسية')} aria-label="بريق - الرئيسية"><span className="brand-sparkle">✦</span><span className="brand-name">بريق</span><span className="brand-tagline">جمالك بطريقتك</span></button>
      <div className="header-actions"><form className="search-box" onSubmit={(e) => { e.preventDefault(); goTo('shop'); }}><Search size={18} /><input value={query} onChange={(e) => { setQuery(e.target.value); setCategory('الرئيسية'); setExpanded(true); }} placeholder="ابحثي عن منتجك المفضل..." aria-label="البحث عن المنتجات" type="search" /></form><button className="icon-button mobile-search-button" onClick={() => setMobileSearchOpen(!mobileSearchOpen)} aria-label="فتح البحث"><Search size={22} /></button><button className="icon-button account-icon" onClick={() => setInfo('حسابي')} aria-label="حسابي"><UserRound size={22} /></button><button className="icon-button header-heart" onClick={() => setDrawer('favorites')} aria-label="المفضلة"><Heart size={23} />{favorites.length > 0 && <span className="count-badge">{favorites.length}</span>}</button><button className="icon-button" onClick={() => setDrawer('cart')} aria-label="السلة"><ShoppingBag size={23} />{cartCount > 0 && <span className="count-badge">{cartCount}</span>}</button></div>
    </div>{mobileSearchOpen && <form className="mobile-search-panel" onSubmit={(e) => { e.preventDefault(); setMobileSearchOpen(false); goTo('shop'); }}><Search size={19} /><input autoFocus value={query} onChange={(e) => { setQuery(e.target.value); setCategory('الرئيسية'); setExpanded(true); }} placeholder="ابحثي عن منتجك المفضل..." aria-label="البحث عن المنتجات" type="search" /><button type="submit">بحث</button></form>}</header>

    <main>
      <section className="hero"><div className="hero-image" /><div className="hero-shade" /><div className="page-wrap hero-content"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> جمال طبيعي.. بثقة أكبر</div><h1>بشرة أكثر إشراقاً<br /><em>كل يوم</em></h1><p>مجموعة مختارة من أفضل مستحضرات العناية بالبشرة والمكياج لتتألقي في كل لحظة.</p><button className="primary-button hero-button" onClick={() => goTo('shop')}>تسوّقي الآن <ArrowLeft size={18} /></button><div className="hero-benefits"><div><ShieldCheck size={25} /><span>منتجات أصلية<br />100% مضمونة</span></div><div><Truck size={25} /><span>شحن سريع<br />في جميع أنحاء المملكة</span></div><div><Sparkles size={25} /><span>مكونات لطيفة<br />ومختارة بعناية</span></div></div></div><div className="hero-note">لكِ كل<br />ما يبرز جمالكِ <span>♡</span></div></div></section>

      <section className="categories-section page-wrap" id="categories"><div className="category-grid">{categories.map((item) => <button key={item.name} className="category-card reveal" onClick={() => selectCategory(item.name)}><ProductImage index={item.image} /><span className="category-overlay" /><span className="category-copy"><strong>{item.name}</strong><small>{item.subtitle}</small><span className="category-link">تسوّقي <ArrowLeft size={15} /></span></span></button>)}</div></section>

      <section className="page-wrap best-section" id="best"><div className="section-heading centered reveal"><span className="section-kicker">اختياراتكِ المفضلة</span><h2>الأكثر مبيعاً</h2><p>منتجات لاقت إعجاب الكثير من جميلات بريق</p></div><div className="product-grid best-grid">{products.slice(4, 8).map((product) => <ProductCard key={product.id} product={product} isFavorite={favorites.includes(product.id)} onFavorite={toggleFavorite} onAdd={addToCart} onOpen={openProduct} />)}</div></section>

      <section className="page-wrap shop-section" id="shop"><div className="shop-top"><div className="section-heading"><span className="section-kicker">جديد بريق</span><h2>{query ? `نتائج البحث عن «${query}»` : category === 'الرئيسية' ? 'وصل حديثاً' : category}</h2><p>{category === 'الرئيسية' && !query ? 'اكتشفي أحدث المنتجات المختارة لكِ' : `${visibleProducts.length} منتجات بانتظاركِ`}</p></div><div className="shop-controls"><label htmlFor="sort-products">الترتيب:</label><select id="sort-products" value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">المميزة</option><option value="low">السعر: الأقل أولاً</option><option value="high">السعر: الأعلى أولاً</option><option value="rating">الأعلى تقييماً</option></select></div></div>
        <div className="filter-chips">{['الرئيسية', 'المكياج', 'العناية بالبشرة', 'العناية بالجسم', 'العطور', 'العروض'].map((item) => <button key={item} className={category === item ? 'selected' : ''} onClick={() => { setCategory(item); setExpanded(true); }}>{item === 'الرئيسية' ? 'الكل' : item}</button>)}</div>
        {shownProducts.length ? <div className="product-grid shop-grid">{shownProducts.map((product) => <ProductCard key={product.id} product={product} isFavorite={favorites.includes(product.id)} onFavorite={toggleFavorite} onAdd={addToCart} onOpen={openProduct} />)}</div> : <div className="empty-results"><Search size={35} /><h3>ما لقينا منتجات مطابقة</h3><p>جرّبي كلمة بحث ثانية أو تصفحي كل المنتجات.</p><button className="outline-button" onClick={() => { setCategory('الرئيسية'); setQuery(''); }}>عرض كل المنتجات</button></div>}
        {category === 'الرئيسية' && !query && !expanded && <div className="show-more"><button className="outline-button" onClick={() => setExpanded(true)}>عرض كل المنتجات <ArrowLeft size={17} /></button></div>}
      </section>

      <section className="page-wrap newsletter-section"><div className="newsletter-art"><div className="newsletter-jar"><span>✦</span><b>بريق</b><small>جمالك بطريقتك</small></div><span className="newsletter-petal petal-one">✿</span><span className="newsletter-petal petal-two">✿</span></div><div className="newsletter-copy"><span className="section-kicker">انضمي إلى عالم بريق</span><h2>كوني أول من يعرف عن العروض الحصرية<br />والمنتجات الجديدة</h2>{subscribed ? <p className="subscription-success"><Check size={19} /> تم تسجيل بريدكِ في هذه المعاينة</p> : <form onSubmit={(e) => { e.preventDefault(); if (newsletterEmail.trim()) setSubscribed(true); }}><input type="email" required value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder="أدخلي بريدك الإلكتروني..." aria-label="البريد الإلكتروني" /><button type="submit">اشتركي</button></form>}<small>هذه نسخة عرض؛ الاشتراك لا يُرسل إلى خادم بعد.</small></div></section>
    </main>

    <footer className="site-footer"><div className="page-wrap footer-grid"><div className="footer-about"><div className="brand footer-brand"><span className="brand-sparkle">✦</span><span className="brand-name">بريق</span><span className="brand-tagline">جمالك بطريقتك</span></div><p>لمسات صغيرة تصنع جمالاً يشبهكِ. اكتشفي عالمكِ المفضل من العناية والمكياج.</p><div className="socials"><button onClick={() => setInfo('تواصل معنا')} aria-label="إنستغرام"><Instagram size={19} /></button><button onClick={() => setInfo('تواصل معنا')} aria-label="البريد الإلكتروني"><Mail size={19} /></button></div></div><div className="footer-column"><h3>روابط سريعة</h3><button onClick={() => selectCategory('المكياج')}>المكياج</button><button onClick={() => selectCategory('العناية بالبشرة')}>العناية بالبشرة</button><button onClick={() => selectCategory('العطور')}>العطور</button><button onClick={() => selectCategory('العروض')}>العروض</button></div><div className="footer-column"><h3>عن بريق</h3><button onClick={() => setInfo('من نحن')}>قصتنا</button><button onClick={() => setInfo('المدونة')}>المدونة</button><button onClick={() => setInfo('تواصل معنا')}>تواصل معنا</button></div><div className="footer-column"><h3>خدمة العملاء</h3><button onClick={() => setInfo('مساعدة')}>مركز المساعدة</button><button onClick={() => setInfo('الشحن والتوصيل')}>الشحن والتوصيل</button><button onClick={() => setInfo('سياسة الإرجاع')}>سياسة الإرجاع</button><button onClick={() => setInfo('الأسئلة الشائعة')}>الأسئلة الشائعة</button></div><div className="footer-perks"><div><Truck size={20} /> شحن مجاني للطلبات فوق 299 ريال</div><div><ShieldCheck size={20} /> منتجات أصلية 100%</div><div><PackageCheck size={20} /> تغليف بعناية وحب</div><div><CircleHelp size={20} /> نحن هنا لمساعدتكِ</div></div></div><div className="footer-bottom"><div className="page-wrap"><span>© 2026 بريق. جميع الحقوق محفوظة ♡</span><span>العربية | ريال سعودي</span></div></div></footer>

    {toast && <div className="toast"><Check size={17} />{toast}</div>}
    {menuOpen && <div className="overlay-layer" onClick={closeLayers}><aside className="side-drawer mobile-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-heading"><span>القائمة</span><button onClick={closeLayers} aria-label="إغلاق"><X /></button></div>{navLinks.map((link) => <button key={link} className="mobile-nav-link" onClick={() => selectCategory(link)}>{link}<ArrowLeft size={18} /></button>)}<button className="mobile-nav-link" onClick={() => { setMenuOpen(false); setDrawer('favorites'); }}>المفضلة <Heart size={18} /></button></aside></div>}
    {drawer && <div className="overlay-layer" onClick={closeLayers}><aside className="side-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-heading"><div><span>{drawer === 'cart' ? 'سلة التسوق' : 'قائمة المفضلة'}</span><small>{drawer === 'cart' ? `${cartCount} منتجات` : `${favorites.length} منتجات`}</small></div><button onClick={closeLayers} aria-label="إغلاق"><X /></button></div><div className="drawer-content">{drawer === 'cart' ? cart.length ? cart.map((item) => { const product = products.find((p) => p.id === item.id); if (!product) return null; return <div className="drawer-product" key={item.id}><ProductImage index={product.image} /><div className="drawer-product-details"><b>{product.name}</b><small>{money(product.price)}</small><div className="quantity-control"><button onClick={() => changeQty(item.id, -1)} aria-label="تقليل الكمية"><Minus size={15} /></button><span>{item.qty}</span><button onClick={() => changeQty(item.id, 1)} aria-label="زيادة الكمية"><Plus size={15} /></button></div></div><button className="remove-item" onClick={() => setCart((previous) => previous.filter((entry) => entry.id !== item.id))} aria-label="حذف المنتج"><Trash2 size={18} /></button></div>; }) : <div className="empty-drawer"><ShoppingBag size={44} /><h3>سلتكِ تنتظر لمستكِ</h3><p>اختاري منتجاتكِ المفضلة وأضيفيها هنا.</p><button className="primary-button" onClick={() => { setDrawer(null); goTo('shop'); }}>تصفحي المنتجات</button></div> : favorites.length ? favorites.map((id) => { const product = products.find((p) => p.id === id); if (!product) return null; return <div className="drawer-product" key={id}><ProductImage index={product.image} /><div className="drawer-product-details"><b>{product.name}</b><small>{money(product.price)}</small><button className="text-action" onClick={() => addToCart(product)}>أضيفي إلى السلة <ArrowLeft size={14} /></button></div><button className="remove-item" onClick={() => toggleFavorite(id)} aria-label="إزالة من المفضلة"><X size={18} /></button></div>; }) : <div className="empty-drawer"><Heart size={44} /><h3>اختياراتكِ الجميلة هنا</h3><p>اضغطي على القلب بجانب أي منتج لإضافته للمفضلة.</p><button className="primary-button" onClick={() => { setDrawer(null); goTo('shop'); }}>تصفحي المنتجات</button></div>}</div>{drawer === 'cart' && cart.length > 0 && <div className="drawer-footer"><div className="price-row"><span>المجموع الفرعي</span><b>{money(subtotal)}</b></div><div className="price-row"><span>الشحن</span><b>{shippingCost === 0 ? 'مجاني' : money(shippingCost)}</b></div>{shippingCost > 0 && <p className="shipping-hint">أضيفي {money(299 - subtotal)} لتحصلي على شحن مجاني</p>}<div className="price-row total"><span>الإجمالي</span><b>{money(subtotal + shippingCost)}</b></div><button className="primary-button full-button" onClick={() => { setDrawer(null); setCheckout(true); setOrderPlaced(false); }}>إتمام الطلب <ArrowLeft size={17} /></button></div>}</aside></div>}
    {selected && <div className="overlay-layer centered-overlay" onClick={closeLayers}><div className="product-dialog" role="dialog" aria-modal="true" aria-label={selected.name} onClick={(e) => e.stopPropagation()}><button className="dialog-close" onClick={closeLayers} aria-label="إغلاق"><X /></button><div className="dialog-picture"><ProductImage index={selected.image} /></div><div className="dialog-details"><span className="section-kicker">{selected.category}</span><h2>{selected.name}</h2><div className="rating"><Star size={16} fill="currentColor" /> {selected.rating} <small>({selected.reviews} تقييم)</small></div><p>{selected.description}. اختير بعناية ليضيف لمسة جميلة إلى روتينكِ اليومي.</p><div className="dialog-price">{money(selected.price)} {selected.oldPrice && <del>{money(selected.oldPrice)}</del>}</div><div className="dialog-features"><span><ShieldCheck size={17} /> منتج أصلي</span><span><Truck size={17} /> شحن سريع</span></div><div className="dialog-actions"><div className="quantity-control"><button onClick={() => setDetailQty(Math.max(1, detailQty - 1))} aria-label="تقليل الكمية"><Minus size={17} /></button><span>{detailQty}</span><button onClick={() => setDetailQty(detailQty + 1)} aria-label="زيادة الكمية"><Plus size={17} /></button></div><button className="primary-button" onClick={() => { addToCart(selected, detailQty); setSelected(null); setDrawer('cart'); }}><ShoppingBag size={18} /> أضيفي إلى السلة</button><button className={`icon-button dialog-favorite ${favorites.includes(selected.id) ? 'selected' : ''}`} onClick={() => toggleFavorite(selected.id)} aria-label="المفضلة"><Heart fill={favorites.includes(selected.id) ? 'currentColor' : 'none'} /></button></div></div></div></div>}
    {checkout && <div className="overlay-layer centered-overlay" onClick={closeLayers}><div className="checkout-dialog" role="dialog" aria-modal="true" aria-label="إتمام الطلب" onClick={(e) => e.stopPropagation()}><button className="dialog-close" onClick={closeLayers} aria-label="إغلاق"><X /></button>{orderPlaced ? <div className="order-complete"><div className="complete-icon"><Check size={37} /></div><h2>شكراً لكِ ♡</h2><p>هذه معاينة لخطوات الطلب. لم يُرسل الطلب ولم تتم أي عملية دفع.</p><button className="primary-button" onClick={() => { setCheckout(false); setOrderPlaced(false); }}>العودة للمتجر</button></div> : <><div className="checkout-header"><span className="section-kicker">خطوة أخيرة لجمالكِ</span><h2>إتمام الطلب</h2><p>هذه نسخة عرض تجريبية. الطلبات لا تُرسل بعد.</p></div><form className="checkout-form" onSubmit={(e) => { e.preventDefault(); setOrderPlaced(true); }}><div className="form-grid"><label>الاسم الكامل<input type="text" name="name" required autoComplete="name" placeholder="اسمكِ الكامل" /></label><label>رقم الجوال<input type="tel" name="phone" required inputMode="tel" pattern="[0-9+ ]{8,15}" placeholder="05xxxxxxxx" /></label><label>المدينة<input type="text" name="city" required autoComplete="address-level2" placeholder="الرياض" /></label><label>البريد الإلكتروني <small>(اختياري)</small><input type="email" name="email" autoComplete="email" placeholder="name@example.com" /></label><label className="wide-label">عنوان التوصيل<input type="text" name="address" required autoComplete="street-address" placeholder="الحي، الشارع، رقم المبنى" /></label></div><div className="checkout-payment"><h3>طريقة الدفع</h3><label><input type="radio" name="payment" checked readOnly /><span><CreditCard size={19} /> الدفع عند الاستلام</span></label></div><div className="checkout-summary"><div className="price-row"><span>المنتجات ({cartCount})</span><b>{money(subtotal)}</b></div><div className="price-row"><span>الشحن</span><b>{shippingCost === 0 ? 'مجاني' : money(shippingCost)}</b></div><div className="price-row total"><span>الإجمالي</span><b>{money(subtotal + shippingCost)}</b></div></div><button className="primary-button full-button" type="submit">معاينة تأكيد الطلب <ArrowLeft size={17} /></button></form></>}</div></div>}
    {info && <div className="overlay-layer centered-overlay" onClick={closeLayers}><div className="info-dialog" role="dialog" aria-modal="true" aria-label={info} onClick={(e) => e.stopPropagation()}><button className="dialog-close" onClick={closeLayers} aria-label="إغلاق"><X /></button><span className="section-kicker">بريق</span><h2>{info}</h2><p>{infoCopy[info] || (info === 'حسابي' ? 'حسابات العملاء ستتوفر عند ربط المتجر بنظام الطلبات. يمكنكِ الآن تصفح المنتجات وتجربة السلة والمفضلة.' : 'يسعدنا اهتمامكِ. تفاصيل التواصل ستتوفر عند إطلاق المتجر.')}</p><button className="outline-button" onClick={closeLayers}>العودة للتسوق</button></div></div>}
  </>;
}
