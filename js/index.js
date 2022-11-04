import $ from "jquery"
$(function(){
  //jquery사용시 주의해야할것 = 각각 mediaquery마다 작업하는게 다르다 그러니 각각의 함수를 불러와야한다. (함수콜 라인)
  let winWid = $(window).width();
  if(winWid > 1160){
    nav1();
    anav1();
    top1();
  }
  else if(winWid > 980 && winWid <= 1159){
    nav1();
    anav1();
    top1();
  } 
  else if(winWid > 580 && winWid <= 979){
    gallery();
    tnav1()
  } 
  else if(winWid > 5 && winWid <= 579){
    gallery();
    tnav1()
    formData()
  } 

  $(window).on('resize',function(e){
    window.location.reload();
  })




  // 함수파트
  // 함수는 javascript를 이용해서 할꺼임
  function gallery(){
    // 준비상태 현재상황은  612345 순으로 재배치해야한다.
    const figWid = $('#gall>figure').width();
  console.log(figWid)
  $('#gall>figure:last').prependTo('#gall')
  $('#gall').css('margin-left', '-' + figWid + 'px')
  //event 만들기

  $('#gallery>.next').on('click',function(e){
    $('#gall:not(:animated)').animate({marginLeft : '-=' + figWid + 'px'},1000,function(){
      $('#gall>figure:first').appendTo('#gall')
      $('#gall').css('margin-left', '-' + figWid + 'px')
    })
  })

  $('#gallery>.prev').on('click',function(e){
    $('#gall:not(:animated)').animate({marginLeft : '+=' + figWid + 'px'},1000,function(){
      $('#gall>figure:last').prependTo('#gall')
      $('#gall').css('margin-left', '-' + figWid + 'px')
    })
    })
     //실무에서는 상관없으나 사이즈를 리셋해야할 필요성이 있다.
  }

  //함수표표
  function formData(){
    const $liform = $('#crwap ul>li>input, #crwap ul>li>textarea');
    $liform.removeAttr('placeholder');
    $liform.on('focus', function(e){
      $(this).prev('label').fadeOut(400)
    }) 
    $liform.on('blur', function(e){
      let str = $(this).val()
      if(str === ''){
        $(this).prev('label').fadeIn(400)
      }
    }) 
  }

  //함수를 만들어서 필요한 경우 불러올것.

  //nav
  function nav1(){
  $('nav li>a').on('click',function(e){
    const navA = $(this).attr('href')
    const Apos = $(navA).offset().top
    const headH = $('header').innerHeight();
    $('html, body').animate({scrollTop : Apos-headH},600)
    return false
  })
  }
  //wnav

  //tnav,mobilid
  function tnav1(){
    let navW = $('nav').width()
  $('header>.btn').on('click',function(e){
    $(this).hide();
    $('#hwrap>nav').animate({left:"0"},600)
  })
  $('#hwrap>nav>.close').on('click',function(e){
    $('#hwrap>nav').animate({left: '-100vw'},600)
    $('header>.btn').show()
  })
  $('nav li>a').on('click',function(e){
    const navA = $(this).attr('href')
    const Apos = $(navA).offset().top
    const headH = $('header').innerHeight();
    $('html, body').animate({scrollTop : Apos-headH},600)
    $('nav').css('left', '-' + navW + 'px')
    $('header>.btn').show()
    return false;
  })
}

  //aside
function anav1(){
$('ul.submenu>li>a').on('click', function(e){
  const navM = $(this).attr('href');
  const POSA = $(navM).offset().top
  const headA = $('header').innerHeight();
  $('html, body').animate({scrollTop : POSA - headA},600)
  return false
})
}
//top
function top1(){
$('.top').on('click',function(e){
  $('html, body').animate({scrollTop : 0},600)
})
}
  //reset에 필요한 내용들이 필요하다. 사이즈가 변경되었을시 사이즈를 리셋하는게 필요하다. 실무상에서는 필요없으나 해당 media에 가서 값을 보러갈때는 하나 portfolio에서 작용할떄는 작동한다. 
})




 
//modal object만들어오기
const mtitle = document.querySelector('#modal h5')
const mimg = document.querySelector('#modal figure>img')
const mfigcap = document.querySelector('#modal figure>figcaption')
const myear = document.querySelector('#modal dl>.year')
const mpgm = document.querySelector('#modal dl>.pgm')
const mads = document.querySelector('#modal dl>.ads')
const mitd = document.querySelector('#modal dl>.itd')

//생성자 함수 factorial object
function MModal(title,imgr,imgi,year,pgm,ads,itd){
  this.title = title
  this.imgr = imgr
  this.imgi = imgi
  this.year = year
  this.pgm = pgm
  this.ads = ads
  this.itd = itd

}
//prototype
MModal.prototype.action = function(){
  mtitle.innerHTML = this.title;
  mimg.setAttribute('src', this.imgr);
  mimg.setAttribute('alt', this.imgi);
  mfigcap.innerHTML = this.imgi;
  myear.innerHTML = this.year;
  mpgm.innerHTML = this.pgm;
  mads.innerHTML = this.ads;
  mitd.innerHTML = this.itd;
}

//인스턴스 array형식
let Mdata = [
  new MModal('workname1','./images/pic01.png','port1','2001','html','aaa@naver.com','itd'),
  new MModal('workname2','./images/pic02.png','port2','2002','css','aaa@naver.com','itd'),
  new MModal('workname3','./images/pic03.png','port3','2003','javas','aaa@naver.com','itd'),
  new MModal('workname4','./images/pic04.png','port4','2004','jqeury','aaa@naver.com','itd'),
  new MModal('workname5','./images/pic01.png','port5','2005','C++','aaa@naver.com','itd'),
  new MModal('workname6','./images/pic02.png','port6','2006','vue','aaa@naver.com','itd')
]

//이벤트 figure -> click, modal의 close event.
const btn1 = document.querySelectorAll('div#gall>figure')
const closee1 = document.querySelector('#modal>.closee')
console.log(btn1)

//언제든지 끌어다가 쓸수 있으므로 항상 기능은 따로 function으로 만들어 주는게 좋다 function을 만들어두면 어떤 시점에서라도 가져다가 사용 가능하기 때문이다.
function play(){
  document.querySelector('#modal').style.display = "block"
  let num = this.getAttribute('name')
  console.log(num)
  Mdata[num-1].action()
}
function stop(){
  document.querySelector('#modal').style.display = "none"
}


btn1.forEach(function(item){
  item.addEventListener('click',play)})

//이벤트함수.
closee1.addEventListener('click',stop)