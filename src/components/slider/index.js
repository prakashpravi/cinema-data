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
      speed: 1000,
      autoplaySpeed: 2000,
      arrows:false,
    }
    return (
      <div className='main_carousel'>
        <Slider className='sliders' {...settings}>
          {[
            'https://www.filmibeat.com/wimgm/1366x70/desktop/2020/01/master_3.jpg',
            'https://1.bp.blogspot.com/-di4zJIry4tk/YBbtymPuG4I/AAAAAAAArI4/0OKS8xN3EqA_inm1AG8-93d5wMf6H1gzwCLcBGAsYHQ/s745/Karnan%2BMovie%2BImages%252C%2BHD%2BWallpapers.JPG',
            'https://www.hdwallpapers.in/download/actor_karthi_hd_sulthan-HD.jpg'
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
