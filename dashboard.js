import React, { useEffect, useState } from 'react';
import { ApiClient } from 'adminjs';

const api = new ApiClient();

const Dashboard = () => {
    const [text, setText] = useState('');
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        api.getPage({ pageName: 'customPage' }).then((res) => {
            setText(res.data.text || '');
        });
    }, []);

    const sendSimpleNotice = () => {
        setNotice({
            type: 'success',
            message: 'Simple notice: CustomPage.message',
        });
    };

    const sendTranslatedNotice = () => {
        setNotice({
            type: 'success',
            message: 'Translated notice: CustomPage.messageWithInterpolation (param 1, param2)',
        });
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h3>CustomPage.header</h3>

            <div style={{ marginBottom: '1rem' }}>
                <p>CustomPage.introduction</p>
                {text ? (
                    <pre style={{ background: '#f4f4f4', padding: '1rem' }}>{JSON.stringify(text, null, 2)}</pre>
                ) : (
                    <div style={{ width: '400px', height: '14px', background: '#eee' }}></div>
                )}
                <p>CustomPage.ending</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={sendSimpleNotice}>CustomPage.button</button>
                <button onClick={sendTranslatedNotice}>CustomPage.noticeWithInterpolation</button>
            </div>

            {notice && (
                <div
                    style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: notice.type === 'success' ? '#e6ffe6' : '#fff0f0',
                        border: '1px solid #ccc',
                    }}
                >
                    {notice.message}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
