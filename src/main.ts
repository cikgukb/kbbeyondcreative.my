// ==========================================================================
// KB BEYOND CREATIVE - INTERACTIVE TS ENGINE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. THEME SWITCHER (DARK / LIGHT)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('kb_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('kb_theme', newTheme);
    });
  }

  // 2. MOBILE MENU DRAWER TOGGLE
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (hamburgerBtn && mobileDrawer) {
    const toggleDrawer = () => {
      mobileDrawer.classList.toggle('open');
    };

    hamburgerBtn.addEventListener('click', toggleDrawer);
    mobileLinks.forEach((link) => link.addEventListener('click', toggleDrawer));
  }

  // 3. NAVBAR SCROLLED STATUS & SCROLL SPY
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    const scrollPos = window.scrollY + 140;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 4. ABOUT SECTION TAB SWITCHER
  const tabBtns = document.querySelectorAll<HTMLButtonElement>('.tab-btn');
  const tabContents = document.querySelectorAll<HTMLElement>('.tab-content');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach((b) => b.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('active'));

      btn.classList.add('active');
      if (targetTab) {
        document.getElementById(`tab-${targetTab}`)?.classList.add('active');
      }
    });
  });

  // 5. SERVICES FILTER BAR
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
  const serviceCards = document.querySelectorAll<HTMLElement>('.service-card-modern');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      serviceCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. MODAL MANAGER
  const modalOverlay = document.getElementById('modal-overlay');
  const openModalBtns = document.querySelectorAll<HTMLButtonElement>('.open-service-modal');
  const closeModalBtns = document.querySelectorAll<HTMLButtonElement>('.modal-close-btn');

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      if (modalOverlay && modalId) {
        modalOverlay.classList.add('active');
        document.querySelectorAll('.service-modal-card').forEach((m) => m.classList.remove('active'));
        document.getElementById(modalId)?.classList.add('active');
      }
    });
  });

  closeModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      modalOverlay?.classList.remove('active');
    });
  });

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  // 7. QUOTATION CALCULATOR WIDGET
  const calcGenerateBtn = document.getElementById('calc-generate-btn');
  const calcType = document.getElementById('calc-type') as HTMLSelectElement | null;
  const calcSize = document.getElementById('calc-size') as HTMLSelectElement | null;

  if (calcGenerateBtn) {
    calcGenerateBtn.addEventListener('click', () => {
      const service = calcType?.value || 'Latihan Usahawan';
      const size = calcSize?.value || 'PKS';

      const msg = `*ANGGARAN SEBUT HARA KB BEYOND CREATIVE*\n----------------------------------------\n💼 *Perkhidmatan:* ${service}\n🏢 *Skala Perniagaan:* ${size}\n----------------------------------------\nSalam Cikgu KB, saya berminat untuk mengetahui anggaran pakej bagi keperluan bisnes saya ini.`;
      const url = `https://wa.me/601110822606?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    });
  }

  // 8. REAL-TIME WHATSAPP MESSAGE PREVIEW & FORM SUBMIT
  const cName = document.getElementById('c-name') as HTMLInputElement | null;
  const cPhone = document.getElementById('c-phone') as HTMLInputElement | null;
  const cService = document.getElementById('c-service') as HTMLSelectElement | null;
  const cMsg = document.getElementById('c-msg') as HTMLTextAreaElement | null;
  const livePreview = document.getElementById('live-msg-preview');
  const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;

  const updatePreview = () => {
    if (!livePreview) return;
    const name = cName?.value.trim() || '[Nama Anda]';
    const phone = cPhone?.value.trim() || '[No Phone]';
    const service = cService?.value || 'Perkhidmatan';
    const message = cMsg?.value.trim() || '[Butiran Mesej Anda]';

    livePreview.textContent = 
`*PERTANYAAN DIREK DI LAMAN WEB KB BEYOND CREATIVE*
----------------------------------------
👤 Nama: ${name}
📞 No. Phone: ${phone}
💼 Servis: ${service}
📝 Mesej: ${message}
----------------------------------------
_Saya ingin mendapatkan konsultasi lanjut. Terima kasih!_`;
  };

  cName?.addEventListener('input', updatePreview);
  cPhone?.addEventListener('input', updatePreview);
  cService?.addEventListener('change', updatePreview);
  cMsg?.addEventListener('input', updatePreview);
  updatePreview();

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = livePreview?.textContent || '';
      const url = `https://wa.me/601110822606?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }
});
