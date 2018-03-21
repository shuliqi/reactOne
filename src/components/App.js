import React, { Component } from 'react';
import '../common/css/APP.css';
import JobPosition from './JobPosition';
import axios from '../http';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    };
  }
  /**
   *  清除函数
  */
  clear(){
    let jobs = this.state.jobs
    for (let i = 0, len = jobs.length;  i < len ; i++) {
      jobs[i].checked = false
      for (let j = 0, len = jobs[i].JobPositions.length ; j < len; j++) {
        jobs[i].JobPositions[j].checked = false
      }
    }
    this.setState({ jobs: [] },function () { 
      this.setState({ jobs: jobs })
    });
  }


  /**
   * [ParentSelect] 父级选择事件
   * @param { Number } ParentIndex 当前操作的父级的下标
  */
  ParentSelect(ParentIndex){
    let jobState = this.state.jobs
    
    for (let i = 0, len = jobState[ParentIndex].JobPositions.length; i < len; i++) {
      jobState[ParentIndex].JobPositions[i].checked = !jobState[ParentIndex].checked 
      
    }
    jobState[ParentIndex].checked = !jobState[ParentIndex].checked 
    this.setState({ jobs: [] }, () => {
      this.setState({ jobs: jobState }, () => {})
    })
    
  }

  /**
   * [UpdataState]  子组件操作,父级组件状态更新事件
   * @param {  Number }  ParentIndex 操作的子组件的父级下标
   * @param {  Array  }  childrenState 子组件的状态
   * @param { booleam }  booleam 当前操作的父级的下标
  */
  UpdataState(ParentIndex,childrenState,booleam){
    let jobState = this.state.jobs
    jobState[ParentIndex].checked = booleam
    jobState[ParentIndex].JobPositions = childrenState
    this.setState({ jobs: []},() =>{
      this.setState({ jobs: jobState },() =>{
        
      })
    })
  }


  /**
   * react生命周期：在第一次渲染后调用
   */
  componentDidMount () {
    axios({
      method: 'post',
      url: 'https://www.easy-mock.com/mock/5ab248c74c67ac465aa6045b/react/JobPosition',
      data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
      }
    }).then(res => {
      let posts = res.data.data
      this.setState({ jobs: posts }, function (param) {});
    })
  }

  render() {
   var  _this = this
    let reactid = 0;
    return (
      <div className="silde">
        <dl className="clearfix re_title">
          <dt className="fl">招聘职位</dt>
          <dd className="fr clear" onClick={ (this.clear).bind(this) }> 清空 </dd>
        </dl>
        <ul className="re_con">
            {
              this.state.jobs.map(function (item, index) {
                  return (
                    <li key={ reactid++}>
                        <dl>
                          <dt>
                            <input type="checkbox" defaultChecked={item.checked} onChange={() => { _this.ParentSelect(index)}} />
                            <i className="iconfont"> </i>
                            <span>{ item.department }</span>
                            <span className="iconfont icon-xialajiantou" > </span>
                            <span className="fr number"> { item.resumesNum } </span>
                          </dt>
                          <dd>
                          <JobPosition JobPositions={item.JobPositions} ParentIndex={index} UpdataState={ _this.UpdataState.bind(_this)}/>
                          </dd>
                        </dl>
                    </li>
                  )
              })
            }
        </ul>
      </div>
    );
  }
}

export default App;