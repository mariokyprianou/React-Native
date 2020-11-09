/*
 * Jira Ticket:
 * Created Date: Mon, 9th Nov 2020, 11:34:26 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {useState} from 'react';
import {format} from 'date-fns';

const fakeBeforePic =
  'https://cdn.vox-cdn.com/thumbor/wyuKqIJeQwb745RJb5zsK2FCOaY=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19424316/EKo3U_qXkAEK1Fz.jpeg';
const fakeAfterPic =
  'https://media.wired.com/photos/5cdefb92b86e041493d389df/191:100/w_1280,c_limit/Culture-Grumpy-Cat-487386121.jpg';

const dataFromBackEnd = [
  {
    takenAt: '2020-08-25T09:18:44.579Z',
    imageURL: fakeBeforePic,
  },
  {
    takenAt: '2020-09-01T09:18:44.579Z',
    imageURL: fakeAfterPic,
  },
];

const formattedData = dataFromBackEnd.map((image) => {
  image.label = format(new Date(image.takenAt), 'dd/LL/y');
  image.value = image.takenAt;
  delete image.takenAt;
  return image;
});

export default function useTransformation() {
  const [transformationImages, setTransformationImages] = useState(
    formattedData,
  );

  return {transformationImages};
}
