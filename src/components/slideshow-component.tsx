import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: 'https://i.kinja-img.com/gawker-media/image/upload/s--Uhh6B3Ih--/c_scale,f_auto,fl_progressive,q_80,w_800/zfmodhifdq5jyomsay1z.png',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: 'https://i.kinja-img.com/gawker-media/image/upload/s--CTZygkiv--/c_scale,f_auto,fl_progressive,q_80,w_800/ohbflusfch6sa9rowv5k.png',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: 'https://cdn.vox-cdn.com/thumbor/ie7E_a8P3rpfX7h0pk06nINrKdY=/0x0:1280x800/1200x800/filters:focal(538x298:742x502)/cdn.vox-cdn.com/uploads/chorus_image/image/59299215/48e35398.0.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

export const Slideshow = () => <UncontrolledCarousel items={items} />;