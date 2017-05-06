import React, {Component} from 'react';
import { fromJS } from 'immutable';
import ReactModal from 'react-modal';

import './App.css';

import Category from './Category';
import Cell from './Cell';

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
        isModalOpen: false,
        modalLabel: null,
        modalContent: null,
        round: 2,
        bettingQuestions: [
            'Nhiều credit hours nhất',
            'Facebook nhiều bạn nhất',
            'Facebook lâu đời nhất',
            'Instagram nhiều follower nhất',
            'Instagram nhiều ảnh nhất',
            'Inbox nhiều unread nhất',
            'Youtube nhiều subscribed channels nhất',
            'Hit đc note cao nhất',
            'Hit đc note thấp nhất'
        ],
        bettingClicked: fromJS([
            false, false, false, false, false, false, false, false, false
        ])
    }

    onCellClick = (categoryId, questionId) => {
        this.setState(({ clicked, categories, scores }) => ({
            // Set active question
            isModalOpen: true,
            modalLabel: `${categories[categoryId].label} - ${scores[questionId]}`,
            modalContent: categories[categoryId].questions[questionId],

            // Toggle clicked
            clicked: clicked.setIn([categoryId, questionId], true)
        }));
    }

    handleCloseModal = () => {
        this.setState({
            isModalOpen: false
        });
    }

    goNextRound = () => {
        this.setState({
            round: 2
        })
    }

    goPreviousRound = () => {
        this.setState({
            round: 1
        })
    }

    buildModal = () => {
        const { isModalOpen, modalLabel, modalContent } = this.state;

        return (
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
                        {modalContent}
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
        );
    }

    onBettingClick = (categoryId, questionId) => {
        // Ignore categoryId
        this.setState(({ bettingQuestions, bettingClicked }) => ({
            // Set modal content and open modal
            isModalOpen: true,
            modalLabel: `Cược Điểm - ${questionId + 1}`,
            modalContent: bettingQuestions[questionId],

            // Toggle clicked
            bettingClicked: bettingClicked.set(questionId, true)
        }));
    }

    render() {
        const { categories, clicked, round, bettingQuestions, bettingClicked } = this.state;

        const round1 = round === 1 && (
            <div id="round-1">
                <h2 className="App-header">
                    VINCEF Jeopardy
                </h2>
                <div className="col-xs-11">
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
                <span
                    className="glyphicon glyphicon-circle-arrow-right col-xs-1"
                    onClick={this.goNextRound}
                    style={{
                        cursor: 'pointer'
                    }}
                />
            </div>
        );

        const round2 = round === 2 && (
            <div id="round-2">
                <h2 className="App-header">Cược Điểm</h2>
                <span
                    className="glyphicon glyphicon-circle-arrow-left col-xs-1"
                    onClick={this.goPreviousRound}
                    style={{
                        cursor: 'pointer'
                    }}
                />
                <div className="col-xs-11">
                    {bettingQuestions.map((question, i) => (
                        <Cell
                            key={i}
                            id={i}
                            categoryId={0}
                            onClick={this.onBettingClick}
                            clicked={bettingClicked.get(i)}
                            score={i+1}
                        />
                    ))}
                </div>
            </div>
        );

        return (
            <div className="App">
                {round1}
                {round2}
                {this.buildModal()}
            </div>
        );
    }
}

export default App;
