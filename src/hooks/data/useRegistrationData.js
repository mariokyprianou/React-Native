/*
 * Created Date: Thu, 5th Nov 2020, 16:28:42 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */
import {useState} from 'react';

 const data = {
    genders: ['Female', 'Male', 'Other', "Prefer not to say"],
    countries: ['United Kingdom',  'India'],
    regions: ['Andrha Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana',
    'Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya',
    'Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
    'Uttarakhand','West Bengal' ]
  }

export default function useRegistrationData() {
  const [registrationData, setRegistrationData] = useState(data);

  return {registrationData};
}