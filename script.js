
const themeBtn = document.getElementById('theme-btn-trigger');
themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    showToast(`Mövzu dəyişdirildi: ${newTheme === 'dark' ? 'Qaranlıq Mod' : 'Gündüz Modu'}`);
});

const filterButtons = document.querySelectorAll('.nav-tab');
const newsCards = document.querySelectorAll('.premium-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        newsCards.forEach(card => {
            const cardType = card.getAttribute('data-filter-type');
            if (filterValue === 'all' || cardType === filterValue) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

function votePoll(element) {
    const allRows = document.querySelectorAll('.poll-row');
    allRows.forEach(row => {
        row.classList.add('voted');
        row.querySelector('.poll-percentage').style.display = 'block';
    });
    element.classList.add('selected');
    showToast("Səsiniz qeydə alındı! Təşəkkür edirik.");
}

// live TV 
const liveBtn = document.getElementById('live-btn-trigger');
const liveModal = document.getElementById('live-modal');
const closeModal = document.getElementById('close-modal');

liveBtn.addEventListener('click', () => liveModal.style.display = 'flex');
closeModal.addEventListener('click', () => liveModal.style.display = 'none');
window.addEventListener('click', (e) => { if (e.target === liveModal) liveModal.style.display = 'none'; });


const searchInput = document.getElementById('football-search');
searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase().trim();
    newsCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(value)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

const newsCardsList = document.querySelectorAll('.premium-card');
const mainNewsGroup = document.getElementById('main-news-group'); // Hero və Grid buradadır
const asyncReaderBox = document.getElementById('async-reader'); // Ətraflı məlumat qutusu
const closeReaderTrigger = document.getElementById('close-reader');
const heroCard = document.querySelector('.premium-hero-card');

function openDetailedNews(title, bodyText, category, views, imgUrl) {
    document.getElementById('reader-headline').innerText = title;
    document.getElementById('reader-category').innerText = category;
    document.getElementById('reader-views').innerText = views;
    document.getElementById('reader-body-content').innerText = bodyText;
    
    const imgWrapper = document.querySelector('.reader-hero-img-wrapper');
    imgWrapper.style.backgroundImage = `linear-gradient(to top, var(--surface-card) 5%, transparent 95%), url('${imgUrl}')`;

    mainNewsGroup.style.display = 'none';
    asyncReaderBox.style.display = 'block';
    
    window.scrollTo({ top: asyncReaderBox.offsetTop - 100, behavior: 'smooth' });
    showToast(`Xəbər yükləndi: ${category}`);
}

newsCardsList.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.getAttribute('data-title');
        const bodyText = card.getAttribute('data-body');
        const category = card.getAttribute('data-cat');
        const views = card.getAttribute('data-views');
        const imgUrl = card.getAttribute('data-img');
        
        openDetailedNews(title, bodyText, category, views, imgUrl);
    });
});

heroCard.addEventListener('click', () => {
    const title = heroCard.getAttribute('data-title');
    const bodyText = heroCard.getAttribute('data-body');
    const category = heroCard.getAttribute('data-cat');
    const views = heroCard.getAttribute('data-views');
    const imgUrl = heroCard.getAttribute('data-img');
    
    openDetailedNews(title, bodyText, category, views, imgUrl);
});

closeReaderTrigger.addEventListener('click', () => {
    asyncReaderBox.style.display = 'none';
    mainNewsGroup.style.display = 'block'; // Hər şeyi yenidən ekrana gətiririk
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

//  TOAST NOTIFICATION WINDOW
function showToast(text) {
    const toast = document.getElementById('toast-notif');
    document.getElementById('toast-text').innerText = text;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

function subscribeNewsletter() {
    const email = document.getElementById('newsletter-email').value;
    if(email.includes('@')) {
        showToast("Abunəliyiniz uğurla tamamlandı! Xəbər matrisinə qoşuldunuz.");
        document.getElementById('newsletter-email').value = '';
    } else {
        showToast("Zəhmət olmasa düzgün email ünvanı daxil edin.");
    }
}