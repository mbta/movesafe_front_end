import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
	page: {
		paddingHorizontal: 15,
	},
	section: {
		border: 1,
		borderColor: "#000",
		marginTop: 15
	},
	headerSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		display: "flex",
	},
	formSection: {

	},
	auditLogSection: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		gap: 25
	},
	formTitleSection: {
		paddingHorizontal: 5,
		paddingVertical: 10,
		borderBottom: 1
	},
	headerItemSection: {
		padding: 5,
	},
	trainNumberText:{
		fontSize: 12,
		textAlign: "right"
	},
	headerCarItemSection: {
		padding: 5,
		width: 85
	},
	header: {
		fontSize: 14
	},
	subHeader: {
		fontSize: 12
	},
	signatureItemSection: {
		flexDirection: "row",
		borderBottom: 1
	},
	textTitle: {
		fontSize: 9
	},
	textContent: {
		fontSize: 10
	},
	textComment: {
		fontSize: 10,
		paddingHorizontal: 5,
		paddingBottom: 5
	},
	commentContainer:{
		borderTop: 1,
	},
	textCommentTitle: {
		fontSize: 9,
		fontWeight: "bold",
		paddingHorizontal: 5,
		paddingTop: 5
	},
	table: {
		display: "flex",
		width: "auto",
		margin: "10px 0",
		flexDirection: "column",
    border: 1
	},
	tableRow: {
		margin: "auto",
		flexDirection: "row",
	},
	tableCol: {
		width: "20%",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#000",
	},
	tableCell: {
		margin: "auto",
		marginTop: 5,
		fontSize: 10,
	},
  a: {
    textDecoration: "none"
  },
	signatureImage: {
		height: 80,
		width: 150
	},
	questionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	questionHeaderOne: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottom: 1,
	},
	questionTitleHeader: {
		width: "58%",
		padding: 6,
		borderBottom: 1
	},
	carNumberTitleHeader: {
		
	},
	questionCarHeader: {
		flexDirection: "column",
		justifyContent:"space-between",
		borderLeft: 1,
		width: "42%",
	},
	questionCarNumberHeader: {
		flexDirection: "row",
		justifyContent:"space-between",
		borderTop: 1,
		borderBottom: 1
	},
	questionSection: {
		width: "58%",
		paddingHorizontal: 5,
		paddingVertical: 3,
		borderBottom: 1,
	},
	questionAnswerSection: {
		flexDirection: "row",
		justifyContent:"space-between",
		alignItems: "center",
		width: "42%",
		borderLeft: 1,
		borderBottom: 1
	},
	questionContainer: {
		flexDirection: "column",
		borderLeft: 1,
		borderBottom: 1,
		width: "42%",
	},
	questionSimpleAnswerSection: {
		flexDirection: "row",
		justifyContent:"space-between",
		alignItems: "center",
	},
	textCarNumber: {
		fontSize: 11,
		paddingHorizontal: 5,
		borderLeft: 1
	},
	carNumberSubHeader: {
		fontSize: 12,
		textAlign: "center"
	},
	answer: {
		width: "7%",
		fontSize: 10,
		fontWeight: "bold",
		textAlign: "center",
		paddingHorizontal: 10,
	},
	answerYesNo:{
		fontSize: 10,
		alignItems: "center",
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	answerTitle: {
		fontSize: 11,
		fontWeight: "bold"
	},
	formQuestionsSection: {
		flexDirection: "row"
	},
	doubleAnswerSection: {
		width: "42%",
		flexDirection: "column",
		borderLeft: 1,
		borderBottom: 1
	}
});