{
    const pageNav = document.querySelector('.page-navigation');
    const hamburger = document.querySelector('.hamburger');
    
    const pageHeader = document.querySelector('.page-header');
    const sections = [...document.querySelectorAll('section')];
    const menuLinks = [...document.querySelectorAll('.page-navigation__item a')];
    
    
    hamburger.addEventListener('click', () => toggleMenu());
    window.addEventListener('scroll', () => toggleShrink());
    
    function toggleMenu() {
        pageNav.classList.toggle('page-navigation--is-expanded');
        hamburger.classList.toggle('hamburger--close');
//        logo.classList.toggle('');
    }
    
    function toggleShrink() {
        const headerHeight = pageHeader.clientHeight;
        
        if(window.pageYOffset > (headerHeight/2)) {
            pageHeader.classList.add('page-header--tiny');
            menuLinks.forEach(link => link.classList.add('link'));
        }else {
            pageHeader.classList.remove('page-header--tiny');
            menuLinks.forEach(link => link.classList.remove('link'));
//            menuLinks.classList.remove('page-nav--tiny');
        }
        
        
    }
    
    console.log(menuLinks);
    
    
}






//$(document).ready(function(){
//   $('.hamburger').click(function(e){
//      $(this).toggleClass('hamburger--close ');
//       $('.page-navigation').toggleClass('page-navigation--is-expanded');
//       
//   });
//    
//    $(window).on('scroll touchmove', function(){
//       $('.page-header').toggleClass('page-header--tiny', $(document).scrollTop() > 0); 
//    });
//       
//});