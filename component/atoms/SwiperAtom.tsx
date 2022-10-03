import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react' //カルーセル用のタグをインポート
import SwiperCore, { Pagination, Navigation, Autoplay, EffectFade } from 'swiper' //使いたい機能をインポート
import 'swiper/css';
import s from './SwiperStyle.module.css';

SwiperCore.use([Pagination, Navigation, Autoplay])

const images = [
  "/img_curry/1.jpg",
  '/img_curry/2.jpg',
  '/img_curry/3.jpg',
  '/img_curry/4.jpg',
  '/img_curry/5.jpg',
  '/img_curry/6.jpg',
  '/img_curry/7.jpg',
  '/img_curry/8.jpg',
  '/img_curry/9.jpg',
  '/img_curry/10.jpg',
  '/img_curry/11.jpg',
]

export function SwiperAtom() {
  return (
    <div className='py-20'>
      <Swiper
        slidesPerView={3} //一度に表示するスライドの数
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet ${s.custom_bullet}`, //非アクティブなアイコンのクラスを指定
          bulletActiveClass: `swiper-pagination-bullet-active ${s.custom_bullet_active}`, //アクティブなアイコンのクラスを指定
        }}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        speed={500}
        // effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation
        loop={true}
      >
        {images.map((src: string, index: number) => {
          return (
            <SwiperSlide key={`${index}`}>
              <Image
                src={src}
                layout="responsive"
                width={640}
                height={400}
                alt="test_image"
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
