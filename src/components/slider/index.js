import React, { Component } from 'react'
import Slider from 'react-slick'
import './styled.css'

export default class AutoPlay extends Component {
  render () {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000
    }
    return (
      <div className='main_carousel'>
        <Slider className='sliders' {...settings}>
          {[
            'https://wallpaperaccess.com/full/82910.jpg',
            'https://www.epw.in/system/files/di_images/2020/02/26/xjoker-main.png.pagespeed.ic.auRXns3Ltd.webp',
            'https://www.desktopbackground.org/download/o/2010/11/08/107714_batman-joker-cartoon-android-comics-1920x1080-hd-wallpapers-and_1920x1080_h.jpg'
          ].map(v => {
            return (
              <div className='sliders'>
                <img src={v} alt='img' />
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }
}
