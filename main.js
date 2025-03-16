document.addEventListener('DOMContentLoaded', function() {
    // 导航栏动画
    const nav = document.querySelector('nav');
    nav.classList.add('nav-animation');

    // 滚动动画
    const scrollElements = document.querySelectorAll('.scroll-animation');
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('active');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 90)) {
                displayScrollElement(el);
            }
        });
    };

    // 添加滚动监听
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
        updateActiveSection();
    });

    // 更新当前活动section
    const updateActiveSection = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const scroll = window.scrollY;

            if (scroll >= sectionTop && scroll < sectionTop + sectionHeight) {
                const currentId = section.getAttribute('id');
                removeAllActive();
                addActive(currentId);
            }
        });
    };

    const removeAllActive = () => {
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
        });
    };

    const addActive = (id) => {
        const selector = `nav ul li a[href="#${id}"]`;
        document.querySelector(selector)?.classList.add('active');
    };

    // 为所有section添加滚动动画类
    document.querySelectorAll('section:not(.hero)').forEach(section => {
        section.classList.add('scroll-animation');
    });

    // 平滑滚动
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 移动端菜单交互
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击菜单项关闭菜单
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}); 