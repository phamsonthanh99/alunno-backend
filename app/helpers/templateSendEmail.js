const moment = require('moment');

export function templateTeacherAssignedManageSubject(
    subjectName,
    adminName,
    content,
) {
    const date = moment().format('dddd, MMMM Do, YYYY h:mm a');
    return `<body style="font-family: Arial, Helvetica, sans-serif;">
    <div style="text-align: center;">
        <h1>Report for teacher</h1>
        <h1 style="color: #005bac;">Subject Name: ${subjectName}</h1>
        <h2>Date: ${date}</h2>
    </div>
    <p style="font-size: 16px;">Admin <b>${adminName}</b> ${content}.</p>
</body>`;
}
