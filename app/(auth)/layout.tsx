import React from 'react';

const AuthLayout = ({
                        children
                    }): JSX.Element => {
                    return (
                        <div className='h-full flex items-center justify-center'>
                            {children}
                        </div>
                    );
};

export default AuthLayout;