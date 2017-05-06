import React, {Component} from 'react';
import { fromJS } from 'immutable';
import ReactModal from 'react-modal';

import './App.css';

import Category from './Category';

class App extends Component {
    state = {
        scores: [25, 50, 75, 100, 125, 150],
        categories: [
            {
                label: 'Lịch Sử Xã Hội',
                questions: [
                    'Ai là người chỉ huy trận thắng sông Bạch Đằng năm 938?',
                    'Nêu ra 5 tên gọi khác nhau của Hồ Chí Minh.',
                    'Việt Nam có bao nhiêu tỉnh thành, liệt kê 15 tên.',
                    'Có tổng cộng bao nhiêu đời tổng thống Mỹ đã bị ám sát thành công?',
                    'Trên Capitol Building của Texas có 6 lá cờ, là 6 lá cờ gì?',
                    'Sắp xếp các quốc gia sau đây theo dân số: Nam Hàn, Ba Lan, Thụy Điển, Đài Loan, Nhật Bản, Việt Nam.'
                ]
            }, {
                label: 'Văn Hóa Phổ Biến',
                questions: [
                    'Album bán chạy nhất của Michael Jackson là gì?',
                    'Địa chỉ nhà Sherlock Holmes?',
                    'Tập phim cảnh sát hình sự đầu tiên được công chiếu vào năm nào?',
                    'Tại sao Sơn Tùng MTP lại vẽ tha thu?',
                    'Đạo diễn phim Tom & Jerry là ai: Willian Hanna, Joseph Barbera, Gene Deitch, Chuck Jones',
                    'Sắp xếp các diễn viên sau theo tuổi: Patrick Stewart, Ian McKellen, Morgan Freeman, Judi Dench, Samuel Jackson'
                ]
            }, {
                label: 'VINCEF',
                questions: [
                    'Ban nhạc HATT có những thành viên nào?',
                    'Thị thực đến Thế giới 2015 làm những món gì?',
                    'Nhóm nòng cốt nhiều nhất có bao nhiêu người?',
                    'Liệt kê tên các thủ quỹ của VINCEF.',
                    'Những người tham gia hôm nay có bao nhiêu người sinh tháng 5?',
                    'Sắp xếp các năm sau theo độ lớn của ngân sách cho Tuần lễ Quốc tế: 2012, 2013, 2014, 2015, 2016, 2017.'
                ]
            }, {
                label: 'Thể Thao',
                questions: [
                    'Đội tuyển bóng đá Nữ Việt Nam đã vô địch SEA Games được mấy lần?',
                    'Ai là chủ sở hữu của Dallas Mavericks?',
                    'Trong luật bóng chày, chuyện gì sẽ xảy ra khi mà bóng bị ném tắc vào trong mặt nạ của trọng tài?',
                    'Cầu thủ Văn Quyến bán độ vào SEA Games năm nào?',
                    'Cái gì đây?',
                    'Sắp xếp những vận động viên quần vợt sau theo số lượng danh hiệu Grand Slam: Roger Federer, Rafael Nadal, Novak Djokovic, Serena Williams, Venus Williams.'
                ]
            }, {
                label: 'Thế giới Động vật',
                questions: [
                    'Tên mèo phổ biến nhất ở Hoa Kỳ là gì?',
                    'Có gì ở bên trong bướu con lạc đà?',
                    `Lựa chọn thực tế thay thế:
                        - Gấu Bắc cực có da màu đen.
                        - Koala là một loài gấu.
                        - Ngà của con hải mã là loại răng dài ra thường xuyên.`,
                    'Loài động vật nào đã từng sống trên Trái đất có bộ não lớn nhất?',
                    'Con chó nhẹ nhất thế giới nặng bao nhiêu cân?',
                    'Sắp xếp các loài vật sau đây theo độ dài thai nghén: Hà mã, Sư Tử, Sóc, Ngựa, Chó.'
                ]
            }
        ],
        clicked: fromJS([
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false]
        ]),
        activeCategoryId: null,
        activeQuestionId: null
    }

    onCellClick = (categoryId, questionId) => {
        this.setState(({ clicked }) => ({
            // Set active question
            activeCategoryId: categoryId,
            activeQuestionId: questionId,

            // Toggle clicked
            clicked: clicked.setIn([categoryId, questionId], true)
        }));
    }

    handleCloseModal = () => {
        this.setState({
            activeCategoryId: null,
            activeQuestionId: null
        });
    }

    render() {
        const { categories, clicked, activeCategoryId, activeQuestionId, scores } = this.state;

        const isModalOpen = activeCategoryId !== null ? true : false;
        const modalLabel = isModalOpen ? `${categories[activeCategoryId].label} - ${scores[activeQuestionId]}` : null;
        const modalChildren = isModalOpen ? categories[activeCategoryId].questions[activeQuestionId] : null;

        return (
            <div className="App">
                <div className="App-header">
                    <h2>VINCEF Jeopardy</h2>
                </div>
                <ReactModal
                    isOpen={isModalOpen}
                    contentLabel='Question'
                    onRequestClose={this.handleCloseModal}
                >
                    <div className="col-xs-11">
                        <h1>{modalLabel}</h1>
                        <div style={{
                                fontSize: 'larger'
                            }}>
                            {modalChildren}
                        </div>
                    </div>
                    <span
                        className="glyphicon glyphicon-remove-sign col-xs-1"
                        onClick={this.handleCloseModal}
                        style={{
                            float: 'right',
                            cursor: 'pointer'
                        }} />
                </ReactModal>
                <div>
                    {categories.map((category, i) => (
                        <Category
                            key={category.label}
                            label={category.label}
                            id={i}
                            questions={category.questions}
                            onCellClick={this.onCellClick}
                            clicked={clicked.get(i)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
