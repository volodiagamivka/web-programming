import React from 'react';
import './Main.css';
import mainimg from '../../assets/images/background.jpg'
const Main = () => {
    return (
        <main>
            <img src={mainimg} alt="hotel" className="mainimg"/>
            <div className="maintext">
                <h2>Ласкаво просимо до сервісу пошуку готелів!</h2>
                    
                <p>
                Знаходьте найкращі готелі по всьому світу за лічені секунди. Введіть напрямок, дати подорожі та обирайте з сотень пропозицій. Легкий пошук, вигідні ціни та зручне бронювання — все для вашого комфортного відпочинку! 
                </p>
            </div>
            <div className="grid">
                
            </div>

        </main>
    );
};

export default Main;
