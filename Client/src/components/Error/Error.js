import React from 'react';
import './Error.scss';

function ErrorPage() {
    return (
        <div className="error_page_wrap">
            <div className="container">
                <h2 className="title">요청하신 페이지를 찾을 수 없습니다.</h2>
                <div>
                    <p>방문하시려는 페이지의 주소가 잘못 입력되었거나,</p>
                    <p>페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.</p>
                    <p>입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.</p>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;