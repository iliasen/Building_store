import React, {useContext, useState} from 'react'
import { Context } from '../index'
import { useNavigate } from 'react-router-dom'
import {LOGIN_ROUTE, SHOP_ROUTE} from '../utils/consts'

import '../styles/AccountPage.css'
import Delete from "../components/modals/DelAccount";
import ChangePass from "../components/modals/ChangePass";
const AccountPage = () => {
  const { user } = useContext(Context)
  const [delVisible, setDelVisible] = useState(false)
  const [changeVisible, setChangeVisible] = useState(false)

  let nav = useNavigate()
  const logOut = async () => {
    user.setUser({})
    user.setAuth(false)
    localStorage.clear();
    nav(SHOP_ROUTE)
  }

  const switch_account = async () => {
      nav(LOGIN_ROUTE)
  }

  return (
  <div className='Account'>
      <div className="User_data">
        <div className='Logo_account'></div>
        <div className='mb-2' style={{color: '#F5F5F5'}}>
          <div>email:ㅤ{user.user.email}</div>
          <div>id:ㅤ{user.user.id}</div>
          <div>role:ㅤ{user.user.role}</div>
        </div>
        <div className='mb-2'>
          <div className='switch_account_button' onClick={switch_account}>Сменить аккаунт</div>
          <div className='switch_account_button' onClick={() => setChangeVisible(true)}>Изменить пароль</div>
        </div>
        <div className='logOut_button' onClick={logOut}>Выйти</div>
        <div className='logOut_button' onClick={() => setDelVisible(true)}>Удалить аккаунт</div>
        <Delete show={delVisible} onHide={() => setDelVisible(false)}></Delete>
        <ChangePass show={changeVisible} onHide={() => setChangeVisible(false)}></ChangePass>
      </div>

  </div>
  )
}

export default AccountPage
