/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";

import {ReactComponent as FacebookIcon} from '../../assets/icons/socials/FacebookIcon.svg'
import {ReactComponent as InstagramIcon} from '../../assets/icons/socials/InstagramIcon.svg'
import {ReactComponent as TwitterIcon} from '../../assets/icons/socials/TwitterIcon.svg'
import {ReactComponent as YoutubeIcon} from '../../assets/icons/socials/YoutubeIcon.svg'
import {ReactComponent as EnIcon} from '../../assets/icons/langs/EnIcon.svg'
import {ReactComponent as FrIcon} from '../../assets/icons/langs/FrIcon.svg'
import CustomSelect from "../../components/DropDown";
function SocialHeader({headerRef}: any) {
  const [sort, setSort] = useState('fr')
  const _lang = [
    {label: <><FrIcon width={19} className="mr-1"/> Français (FR)</>, value: 'fr'},
    {label: <><EnIcon width={19} className="mr-1"/> English (EN)</>, value: 'en'},
    {label: <><EnIcon className="mr-1"/> Arabe (AR)</>, value: 'ar'},
   ]
  return <div className="social-header w-full" ref={headerRef}>
    <div className="w-max-width w-full">
      <div className="relative w-full flex flex-row justify-end">
        <div className="absolute top-1 left-0 social-links flex flex-row items-center">
          <a href="#" target={'_blank'}> <FacebookIcon/> </a>
          <a href="#" target={'_blank'}> <InstagramIcon/> </a>
          <a href="#" target={'_blank'}> <TwitterIcon/> </a>
          <a href="#" target={'_blank'}> <YoutubeIcon/> </a>
          <a href="#" target={'_blank'}> <FacebookIcon/> </a>
        </div>

        <div className="other-links relative">
          <a
          href={'https://partner.6tims.com/'}
          target="_blank"
          style = {{textDecoration: 'none'}}
          >
          Vendre sur 6tims
          </a>

          <Link
          to={'/account/orders'}
          style = {{textDecoration: 'none'}}
          >
          Suivi de commande
          </Link>

          <Link
          to={'/q'}
          style = {{textDecoration: 'none'}}
          >
          Aide
          </Link>

          <div className="language relative">
          <CustomSelect
                defaultData={_lang}
                selected={sort}
                onChange={setSort}/>
          </div>
        </div>
      </div>
    </div>
    
  </div>;
}

export default SocialHeader;
