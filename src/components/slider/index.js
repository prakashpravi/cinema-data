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
      arrows: false
    }
    return (
      <div className='main_carousel'>
        <Slider className='sliders' {...settings}>
          {[
            'https://moviegalleri.net/wp-content/gallery/sultan-images/Sultan-Movie-Images-HD-Karthi-Rashmika-Mandanna-35c2f2c.jpg',
            'https://moviegalleri.net/wp-content/gallery/master-hd-images/Master-Movie-HD-Images-Vijay-Sethupathi-Malavika-Mohanan-814b98d.jpg',
            'https://moviegalleri.net/wp-content/gallery/karnan-images-hd/Dhanush-Karnan-Movie-Images-HD-Photos-Pics-6d71a1a.jpg' // 'https://www.indiannewslive.com/movies/wp-content/uploads/2021/03/Master-New-2021-1.jpg',
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
