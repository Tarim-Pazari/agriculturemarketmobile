import {View, Text} from 'react-native';
import React from 'react';
import {SvgType} from '../types/type';
import {Circle, G, Path, Polygon, Rect, Svg} from 'react-native-svg';

export default function FollowTrackingListSvg({
  height = 20,
  width = 20,
}: SvgType) {
  return (
    <Svg height={height} width={width} viewBox="0 0 56 56">
      <G>
        <Rect x="38" y="28" fill="#FFFFFF" width="16" height="2" />
        <Circle fill="#FFFFFF" cx="28" cy="29.708" r="1" />
        <Rect x="38" y="52" fill="#FFFFFF" width="16" height="2" />
        <Rect x="38" y="48" fill="#FFFFFF" width="16" height="2" />
        <Rect x="38" y="32" fill="#FFFFFF" width="16" height="2" />
        <Rect x="38" y="44" fill="#FFFFFF" width="16" height="2" />
        <Rect x="38" y="40" fill="#FFFFFF" width="16" height="2" />
        <Rect x="38" y="36" fill="#FFFFFF" width="16" height="2" />
        <Path
          fill="#66CEDB"
          d="M36,30.708v-4V26H20v8h16V30.708z M28,32.708c-1.654,0-3-1.346-3-3s1.346-3,3-3s3,1.346,3,3
       S29.654,32.708,28,32.708z"
        />
        <Rect x="20" y="48" fill="#FFFFFF" width="16" height="2" />
        <Rect x="2" y="52" fill="#FFFFFF" width="16" height="2" />
        <Circle fill="#FFFFFF" cx="10" cy="41.708" r="1" />
        <Path
          fill="#66CEDB"
          d="M18,42.708v-4V38H2v8h16V42.708z M10,44.708c-1.654,0-3-1.346-3-3s1.346-3,3-3s3,1.346,3,3
       S11.654,44.708,10,44.708z"
        />
        <Rect x="2" y="48" fill="#FFFFFF" width="16" height="2" />
        <Rect x="20" y="44" fill="#FFFFFF" width="16" height="2" />
        <Rect x="20" y="40" fill="#FFFFFF" width="16" height="2" />
        <Polygon fill="#FFFFFF" points="36,36 20,36 20,36.708 20,38 36,38 	" />
        <Rect x="20" y="52" fill="#FFFFFF" width="16" height="2" />
        <Polygon fill="#FFFFFF" points="54,24 38,24 38,24.708 38,26 54,26 	" />
        <Circle fill="#FFFFFF" cx="46" cy="17.708" r="1" />
        <Path
          fill="#66CEDB"
          d="M54,14H38v8h16V14z M46,20.708c-1.654,0-3-1.346-3-3s1.346-3,3-3s3,1.346,3,3
       S47.654,20.708,46,20.708z"
        />
        <G>
          <Path
            d="M55,12H37c-0.553,0-1,0.155-1,0.708v10V24H19c-0.553,0-1,0.155-1,0.708v10V36H1c-0.553,0-1,0.155-1,0.708v10v4v4
           C0,55.26,0.447,56,1,56h18h18h18c0.553,0,1-0.74,1-1.292v-4v-4v-4v-4v-4v-4v-4v-4v-10C56,12.155,55.553,12,55,12z M38,14h16v8H38
           V14z M2,48h16v2H2V48z M20,44h16v2H20V44z M20,40h16v2H20V40z M36,38H20v-1.292V36h16V38z M20,48h16v2H20V48z M38,48h16v2H38V48z
            M38,44h16v2H38V44z M38,40h16v2H38V40z M38,36h16v2H38V36z M38,32h16v2H38V32z M38,28h16v2H38V28z M38,24.708V24h16v2H38V24.708z
            M20,26h16v0.708v4V34H20V26z M2,38h16v0.708v4V46H2V38z M2,52h16v2H2V52z M20,52h16v2H20V52z M38,54v-2h16v2H38z"
          />
          <Path
            d="M10,38.708c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S11.654,38.708,10,38.708z M10,42.708c-0.552,0-1-0.449-1-1
           s0.448-1,1-1s1,0.449,1,1S10.552,42.708,10,42.708z"
          />
          <Path
            d="M28,26.708c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S29.654,26.708,28,26.708z M28,30.708c-0.552,0-1-0.449-1-1
           s0.448-1,1-1s1,0.449,1,1S28.552,30.708,28,30.708z"
          />
          <Path
            d="M46,14.708c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3C49,16.053,47.654,14.708,46,14.708z M46,18.708
           c-0.552,0-1-0.449-1-1s0.448-1,1-1s1,0.449,1,1S46.552,18.708,46,18.708z"
          />
          <Path
            d="M19,12.122l5.293,5.293c0.391,0.391,1.023,0.391,1.414,0L40,3.122V6h2V0.707C42,0.155,41.553,0,41,0h-5v2h2.586L25,15.44
           l-5.293-5.366c-0.391-0.391-1.023-0.427-1.414-0.037l-18,17.982l1.414,1.405L19,12.122z"
          />
        </G>
      </G>
    </Svg>
  );
}
