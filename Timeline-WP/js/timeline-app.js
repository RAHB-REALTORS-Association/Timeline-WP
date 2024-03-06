// Timeline App 
/*  - This is a simple react app that creates a timeline of events
//  - The timeline is created using react and the data is passed as props
//  - The timeline items are clickable and open a modal with more details
//  - The modal is a simple component that can be reused in other parts of the app
//  - The modal is also a react component and is created using react
//  - The modal is a simple component that can be reused in other parts of the app
*/
(function(window, document, React, ReactDOM) {
    'use strict';
    // Modal Component
    const Modal = ({ isOpen, onClose, content, position }) => {
        if (!isOpen) return null;
      
        const style = {
          left: position === 'left' ? '30%' : 'auto', // Adjust these values based on your layout
          right: position === 'right' ? '30%' : 'auto', // Adjust these values based on your layout
        };
      
        return e('div', { className: 'modal', style: style },
          e('div', { className: 'modal-content' },
            e('span', { className: 'close', onClick: onClose }, '×'),
            content
          )
        );
      };
    // Timeline Item Component  
    var e = React.createElement;
    const TimelineItem = ({data, index}) => {
        const [isModalOpen, setModalOpen] = React.useState(false);
        const [modalContent, setModalContent] = React.useState('');

        const toggleModal = () => {setModalOpen(!isModalOpen);
            // Set the modal content to the current item's description or other data
            setModalContent(data.detailedDescription || 'No additional details available.');};
        React.useEffect(() => {
            if (!isModalOpen) return;
        
            const handleDocumentClick = () => setModalOpen(false);
            document.addEventListener('click', handleDocumentClick);
        
            return () => document.removeEventListener('click', handleDocumentClick);
        }, [isModalOpen]);
        
        // Determine position based on index
        const position = index % 2 === 0 ? 'right' : 'left';
    
        return e('div', {className: 'timeline-item', /*onClick: toggleModal*/},
            e('img', {src:data.iconUrl,className: 'timeline-dot',alt:'Event Icon'}),
            e('div', {className: 'timeline-content'},
                e('h6', null, data.date),
                e('h6', null, data.title),
                e('p', null, data.description),
                e(Modal, { isOpen: isModalOpen, onClose: toggleModal, content: e('p', null, data.detailedDescription || 'No Details'), position: position })
            )
        );
    };
    
// Timeline Component
    var Timeline = function(props) {
        return e('div', {className: 'timeline-container'},
            props.timelineData.map(function(data, idx) {
                return e(TimelineItem, {data: data, key: idx, index : idx});
            })
        );
    };
// Sample Data
    var timelineData = [
        { date: '2023 OCTOBER 23', title: 'RAHB TOWNHALL #1', description: '', detailedDescription:"This is a more detaild description of events and for indepth details we can provide the links as well", iconUrl:"https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/48/000000/external-goverment-voting-elections-tanah-basah-basic-outline-tanah-basah.png" },
        { date: '2023 OCTOBER 23', title: 'WRAR TOWNHALL #1', description: '',detailedDescription:"This is a more detaild description of events and for indepth details we can provide the links as well",iconUrl:"https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/48/000000/external-goverment-voting-elections-tanah-basah-basic-outline-tanah-basah.png" },
        { date: '2023 OCTOBER 31', title: 'RAHB TOWNHALL #2', description: '',detailedDescription:"This is a more detaild description of events and for indepth details we can provide the links as well",iconUrl:"https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/48/000000/external-goverment-voting-elections-tanah-basah-basic-outline-tanah-basah.png" },
        { date: '2023 NOVEMBER 2', title: 'WRAR TOWNHALL #2', description: '',detailedDescription:"This is a more detaild description of events and for indepth details we can provide the links as well",iconUrl:"https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/48/000000/external-goverment-voting-elections-tanah-basah-basic-outline-tanah-basah.png" },
        { date: '2023 NOVEMBER 2', title: 'RAHB TOWNHALL #3', description: '',detailedDescription:"This is a more detaild description of events and for indepth details we can provide the links as well",iconUrl:"https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/48/000000/external-goverment-voting-elections-tanah-basah-basic-outline-tanah-basah.png" },
        { date: '2023 NOVEMBER 14', title: 'SDREB TOWNHALL #3', description: '',detailedDescription:"This is a more detaild description of events and for indepth details we can provide the links as well",iconUrl:"https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/48/000000/external-goverment-voting-elections-tanah-basah-basic-outline-tanah-basah.png" },
        { date: '2023 NOVEMBER 23', title: 'RAHB SEPECIAL GENERAL MEETING', description: 'Motion Carried',detailedDescription:"This is a more detaild description of events and for indepth details we can provide the links as well",iconUrl:"https://img.icons8.com/cotton/64/checkmark.png" },
        { date: '2023 NOVEMBER 23', title: 'WRAR SEPECIAL GENERAL MEETING', description: 'Motion Carried',detailedDescription:"This is a more detaild description of events and for indepth details we can provide the links as well",iconUrl:"https://img.icons8.com/cotton/64/checkmark.png" },
        { date: '2023 NOVEMBER 23', title: 'SDREB SEPECIAL GENERAL MEETING', description: 'Motion Carried',detailedDescription:"This is a more detaild description of events and for indepth details we can provide the links as well",iconUrl:"https://img.icons8.com/cotton/64/checkmark.png" },
        { date: '2023 DECEMBER 6', title: 'RAHB TOWNHALL #1', description: '',detailedDescription:"This is a more detaild description of events and for indepth details we can provide the links as well",iconUrl:"https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/48/000000/external-goverment-voting-elections-tanah-basah-basic-outline-tanah-basah.png" },
        { date: '2024 JANUARY 31', title: 'SDREB SEPECIAL GENERAL MEETING', description: 'Motion Carried',detailedDescription:"This is a more detaild description of events and for indepth details we can provide the links as well",iconUrl:"https://img.icons8.com/cotton/64/checkmark.png" },
    ];
// Render the timeline
    document.addEventListener('DOMContentLoaded', function() {
        var container = document.getElementById('timeline-wp');
        if (container) {
            ReactDOM.render(e(Timeline, {timelineData: timelineData}), container);
        }
    });
})(window, document, React, ReactDOM);
