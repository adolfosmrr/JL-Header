document.addEventListener('DOMContentLoaded', () => {

    /* Header Wrapper & Overlay */

    const headerWrapper = document.querySelector('.headerWrapper');
    const headerOverlay = document.querySelector('.header_overlay');

    /* Header Burger Line Variables */
    
    const burgerBtn = document.querySelector('.burgerBtn');
    const topLine = document.querySelector('.burgerLineTop');
    const middleLine = document.querySelector('.burgerLineMiddle');
    const bottomLine = document.querySelector('.burgerLineBottom');

    /* Header Main Links */

    const linksWrapper = document.querySelector('.header_links-wrapper');
    const linksContent = document.querySelector('.header_links-content');
    const links = document.querySelectorAll('.header_nav-text');
    const linksSvg = document.querySelectorAll('.header_nav-svg');
    const customClosetsLink = document.querySelector('.custom-closets');

    /* Header Sublinks */

    const sublinksWrapper = document.querySelector('.header_sublinks-wrapper');
    const sublinksContent = document.querySelectorAll('.header_sublinks-content');

    /* Header Closer Variables */

    const closeHeader = [headerOverlay, burgerBtn]

    function headerLinksHover() {
        links.forEach((link, index) => {
            link.addEventListener('mouseenter', () => {

                let isActive = link.classList.contains('active');

                if(!isActive) {
                    links.forEach(link => link.classList.remove('active'));
                    linksSvg.forEach(svg => svg.classList.remove('active'));
                    sublinksContent.forEach(container => container.classList.remove('active'));
                    link.classList.add('active');
                    linksSvg[index].classList.add('active');
                    sublinksContent[index].classList.add('active');
                }
            })
        })
    };

    function menuOpen() {
        burgerBtn.addEventListener('click', () => {
        
            let isActive = burgerBtn.classList.contains('active')

            if(!isActive) {
                topLine.classList.add('active');
                middleLine.classList.add('active');
                bottomLine.classList.add('active');
                headerWrapper.classList.add('active');
                linksWrapper.classList.add('active');
                linksContent.classList.add('active');
                headerOverlay.classList.add('active');
                setTimeout(() => {
                    sublinksWrapper.classList.add('active');
                    customClosetsLink.classList.add('active');
                }, 100)
                setTimeout(() => {
                    burgerBtn.classList.add('active');
                }, 200)
            }
        })
    }

    function menuClose() {
        closeHeader.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                let isActive = burgerBtn.classList.contains('active');

                if(isActive) {
                    topLine.classList.remove('active')
                    middleLine.classList.remove('active');
                    bottomLine.classList.remove('active');
                    customClosetsLink.classList.remove('active');
                    sublinksWrapper.classList.remove('active');
                    links.forEach(link => link.classList.remove('active'));
                    linksSvg.forEach(svg => svg.classList.remove('active'));
                    links[0].classList.add('active');
                    linksSvg[0].classList.add('active');
                    sublinksContent.forEach(content => content.classList.remove('active'));
                    setTimeout(() => {
                        linksContent.classList.remove('active');
                        linksWrapper.classList.remove('active');
                        headerOverlay.classList.remove('active');
                        setTimeout(() => {
                            headerWrapper.classList.remove('active');
                        }, 150)      
                    }, 50)
                    setTimeout(() => {
                        burgerBtn.classList.remove('active')
                    }, 200)
                }
            })
        })
    }
    
    headerLinksHover();
    menuOpen();
    menuClose();

    /* Header Li Variables */

    const subLinkOptions = document.querySelectorAll('li:not(.header_links-content > ul > li) > a');

    subLinkOptions.forEach(link => {

        const words = link.textContent.trim().split(' ');
        const fragment = document.createDocumentFragment();
        
        words.forEach((word, index)=> {
            let span = document.createElement('span');
            span.textContent = word
            span.classList.add('inline-block', 'word-highlight')
            fragment.appendChild(span)
            span.textContent = index < words.length - 1 ? word + '\u00A0' : word;
        })

        link.innerHTML = '';
        link.appendChild(fragment);
        
    })


    const allWords = document.querySelectorAll('.word-highlight');

    let tl = gsap.timeline();
    
    subLinkOptions.forEach((link, index) => {
        
        link.addEventListener('mouseenter', () => {
            tl.kill();
            let words = link.querySelectorAll('.word-highlight');
            words.forEach(word => gsap.set(word, {backgroundSize: '0% 100%'}));
            allWords.forEach(word => word.classList.remove('active'));
            words.forEach(word => word.classList.add('active'));
            tl.clear();
            tl.to(words, {backgroundSize: '100% 100%', stagger: {each: 0.05}, ease: 'linear', duration: 0.05})

        })

        link.addEventListener('mouseleave', () => {
            tl.kill();
            let words = document.querySelectorAll('.word-highlight.active')
            
            tl.clear();
            tl.to(words, {backgroundSize: '0% 100%', stagger: {each: 0.05, from: 'end'}, ease: 'linear', duration: 0.05})
            
        })
    })    
})
