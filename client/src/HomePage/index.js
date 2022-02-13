import React from 'react'

import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import {studentContent,adminContent} from '../redux/action'
function Index() {
    const dispatch = useDispatch()
    let history = useHistory();
    const user = JSON.parse(localStorage.getItem('student'));
    
    if(user?.accessToken && user?.roles[0] == 'ROLE_STUDENT'){
        dispatch(studentContent(user)) 
        history.push('/student')   
    } 
    if(user?.accessToken && user?.roles[0] == 'ROLE_ADMIN'){
        dispatch(adminContent(user))  
        history.push('/admin')  
    }
    
    return (
        <div>
            <div className="home container-fluid"> 
                <div className="row">  
                    <div className="col"><h1>Des programmes faits sur mesure !</h1> 
                    <span className="text">Choisissez la formule qui vous convient et rejoignez-nous dès maintenant.</span></div>
                    <div className="col"></div> 
                </div>
                <div className="partenaires">   
                    <span className="collaborators-text">Partenaires recruteurs</span>
                    <div> 
                        <img className="img-collaborators" alt="collaborators" src="https://gomycodewebsite.blob.core.windows.net/website/img/oyez_21d0711337.png" />
                    </div>
                    <div>
                        <img className="img-collaborators" alt="collaborators" src="https://gomycodewebsite.blob.core.windows.net/website/img/fis_e81ad737e6.png" />
                    </div>
                    <div>
                        <img className="img-collaborators" alt="collaborators" src="https://gomycodewebsite.blob.core.windows.net/website/img/vistaprint_ddd03b7279.png" />
                    </div>
                    <div>
                        <img className="img-collaborators" alt="collaborators" src="https://gomycodewebsite.blob.core.windows.net/website/img/soprarh_82e5f83da0.png" />
                    </div>
                    <div>
                        <img className="img-collaborators" alt="collaborators" src="https://gomycodewebsite.blob.core.windows.net/website/img/talan_b462595175.png" />
                    </div>
                    <div>
                        <img className="img-collaborators" alt="collaborators" src="https://gomycodewebsite.blob.core.windows.net/website/img/microsoft_logo_153584c489.png" />
                    </div>
                </div>  
                <div className="parcours"> 
                    <span className="about-parcours">Démarrer votre parcours</span>
                    <div className="row">
                    <div className="col">
                        <div className="track-list">
                            <img src="https://gomycodewebsite.blob.core.windows.net/website/img/track_icon_python_for_kids_4bb329105b.png" alt="" />
                            <div className="text-parcours">Digital Marketing </div>
                        </div>
                        <div className="track-list">
                            <img src="https://gomycodewebsite.blob.core.windows.net/website/img/track_icon_web_1813ad067c.png" alt="" />
                            <div className="text-parcours">Intro. to Web development</div>
                        </div>
                        <div className="track-list">
                            <img src="https://gomycodewebsite.blob.core.windows.net/website/img/track_icon_ux_design_5e970375ec.png" alt="" />
                            <div className="text-parcours">Data science</div>
                        </div>
                        <div className="track-list">
                            <img src="https://gomycodewebsite.blob.core.windows.net/website/img/track_icon_jeu_video_f17d9f3275.png" alt="" />
                            <div className="text-parcours">Intro. to Game Development </div>
                        </div>
                        <div className="track-list">
                            <img src="https://gomycodewebsite.blob.core.windows.net/website/img/track_icon_fullstack_js_b6ed8955a9.png" alt="" />
                            <div className="text-parcours">DevOps</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="track-list">
                            <img src="https://gomycodewebsite.blob.core.windows.net/website/img/track_icon_fullstack_js_d5226c5e82.png" alt="" />
                            <div className="text-parcours">Full-Stack Development</div>
                        </div>
                        <div className="track-list">
                            <img src="https://gomycodewebsite.blob.core.windows.net/website/img/track_icon_deep_learning_7cd1262d19.png" alt="" />
                            <div className="text-parcours">Artificial Intelligence </div>
                        </div>
                        <div className="track-list">
                            <img src="https://gomycodewebsite.blob.core.windows.net/website/img/track_icon_deep_learning_7cd1262d19.png" alt="" />
                            <div className="text-parcours">Deep Learning</div>
                        </div>
                        <div className="track-list">
                            <img src="https://gomycodewebsite.blob.core.windows.net/website/img/track_icon_app_inventor_d13dae4bc5.png" alt="" />
                            <div className="text-parcours">Kids track</div>
                        </div>
                        <div className="track-list">
                            <img src="https://gomycodewebsite.blob.core.windows.net/website/img/track_icon_ux_design_5e970375ec.png" alt="" />
                            <div className="text-parcours">UX/UI Design</div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index 
