import React from 'react';
import Lottie from 'lottie-react';

const LottieAnimation = ({ animationData, loop = true, className = '', style = {} }) => {
    return (
        <div className={`${className}`} style={style}>
            <Lottie
                animationData={animationData}
                loop={loop}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default LottieAnimation;
