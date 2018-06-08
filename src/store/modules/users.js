import Cookies from 'js-cookie'

const users = {
  state:{
    menus:localStorage.getItem('_menus'),
    userInfo:Cookies.getJSON('_userInfo'),
    orgId:sessionStorage.getItem('_orgId')
  },
  mutations:{
    SET_MENUS:(state,menus)=>{
      localStorage.setItem('_menus',menus);
      state.menus = menus;
    },
    SET_USERINFO:(state,userInfo)=>{
      Cookies.set('_userInfo',userInfo,{expires:!userInfo?0:3});
      state.userInfo = userInfo;
    },
    SET_ORGID:(state,orgId)=>{
      sessionStorage.setItem('_orgId',orgId);
      state.orgId = orgId;
    }
  }
}

export default users