import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import messages from "@repo/constants/messages";
import { IPDFData } from "@repo/models";
import { useExportToPdf, useFormatDate, useFormatString } from "@repo/ui/hooks";
import { styles } from "./styles";

const stringFormatter = useFormatString();
const exportFormatter = useExportToPdf();
const dateFormatter = useFormatDate();

const PDFDocument: React.FC<{ data: IPDFData }> = ({ data }) => {
  function renderAnswerItem(answer: any, index: any) {
    return (
      <Text key={index} style={styles.answer}>
        {answer ? messages.PDF.answerMark : messages.PDF.answerEmpty}
      </Text>
    );
  }

  function renderQuestionAnswers(
    questionType: number,
    selectedCars: any,
    comments?: string
  ) {
    switch (questionType) {
      case 0:
        return (
          <View style={styles.questionContainer}>
            <View style={styles.questionSimpleAnswerSection}>
              {exportFormatter
                .checkCarProblems(data.orderedMoveCars, selectedCars)
                .map((answer, index) => renderAnswerItem(answer, index))}
            </View>
            {comments && (
              <View style={styles.commentContainer}>
                <Text style={styles.textCommentTitle}>
                  {messages.PDF.comments}
                </Text>
                <Text style={styles.textComment}>{comments}</Text>
              </View>
            )}
          </View>
        );
      case 1:
        return (
          <View style={styles.doubleAnswerSection}>
            <Text style={styles.answerTitle}>{messages.PDF.majorDefect}</Text>
            <View style={styles.questionHeaderOne}>
              {exportFormatter
                .checkCarProblems(
                  data.orderedMoveCars,
                  selectedCars.majorDefects
                )
                .map((answer, index) => renderAnswerItem(answer, index))}
            </View>
            <Text style={styles.answerTitle}>{messages.PDF.minorDefect}</Text>
            <View style={styles.questionHeader}>
              {exportFormatter
                .checkCarProblems(
                  data.orderedMoveCars,
                  selectedCars.minorDefects
                )
                .map((answer, index) => renderAnswerItem(answer, index))}
            </View>
            {comments && (
              <View style={styles.commentContainer}>
                <Text style={styles.textCommentTitle}>
                  {messages.PDF.comments}
                </Text>
                <Text style={styles.textComment}>{comments}</Text>
              </View>
            )}
          </View>
        );
      case 2:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.answerYesNo}>
              {selectedCars ? messages.PDF.no : messages.PDF.yes}
            </Text>
            {comments && (
              <View style={styles.commentContainer}>
                <Text style={styles.textCommentTitle}>
                  {messages.PDF.comments}
                </Text>
                <Text style={styles.textComment}>{comments}</Text>
              </View>
            )}
          </View>
        );
      case 3:
        return (
          <View style={styles.doubleAnswerSection}>
            <Text style={styles.answerTitle}>{messages.PDF.guardSide}</Text>
            <View style={styles.questionHeaderOne}>
              {exportFormatter
                .checkCarProblems(data.orderedMoveCars, selectedCars.guardSide)
                .map((answer, index) => renderAnswerItem(answer, index))}
            </View>
            <Text style={styles.answerTitle}>{messages.PDF.motorperson}</Text>
            <View style={styles.questionHeader}>
              {exportFormatter
                .checkCarProblems(
                  data.orderedMoveCars,
                  selectedCars.motorPersonSide
                )
                .map((answer, index) => renderAnswerItem(answer, index))}
            </View>
            {comments && (
              <View style={styles.commentContainer}>
                <Text style={styles.textCommentTitle}>
                  {messages.PDF.comments}
                </Text>
                <Text style={styles.textComment}>{comments}</Text>
              </View>
            )}
          </View>
        );
      default:
        return <></>;
    }
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.headerItemSection}>
            <Text style={styles.header}>{data.yard}</Text>
            <Text style={styles.header}>
              {messages.PDF.moveDetails} -{" "}
              {stringFormatter.formatReasonName(data.reason)}
            </Text>
          </View>

          <View style={styles.headerSection}>
            <View style={styles.headerItemSection}>
              <Text style={styles.textTitle}>{messages.PDF.yardmaster}</Text>
              <Text style={styles.textContent}>{data.yardmaster}</Text>
            </View>
            <View style={styles.headerItemSection}>
              <Text style={styles.textTitle}>{messages.PDF.employeeBadge}</Text>
              <Text style={styles.textContent}>{data.employeeBadge}</Text>
            </View>
            <View style={styles.headerItemSection}>
              <Text style={styles.textTitle}>{messages.PDF.date}</Text>
              <Text style={styles.textContent}>{data.date}</Text>
            </View>
            <View style={styles.headerItemSection}>
              <Text style={styles.textTitle}>{messages.PDF.time}</Text>
              <Text style={styles.textContent}>{data.time}</Text>
            </View>
          </View>

          <View style={styles.headerSection}>
            <View style={styles.headerItemSection}>
              <Text style={styles.textTitle}>{messages.PDF.fromTo}</Text>
              <Text style={styles.textContent}>{data.fromTo}</Text>
            </View>
            <View style={styles.headerItemSection}>
              <Text style={styles.subHeader}>{messages.PDF.trainNumber}</Text>
            </View>
            <View style={styles.headerSection}>
              <View style={styles.headerCarItemSection}>
                <Text style={styles.textTitle}>
                  {messages.PDF.firstCarPair}
                </Text>
                <Text style={styles.textContent}>{data.first}</Text>
              </View>
              <View style={styles.headerCarItemSection}>
                <Text style={styles.textTitle}>
                  {messages.PDF.secondCarPair}
                </Text>
                <Text style={styles.textContent}>{data.second}</Text>
              </View>
              <View style={styles.headerCarItemSection}>
                <Text style={styles.textTitle}>
                  {messages.PDF.thirdCarPair}
                </Text>
                <Text style={styles.textContent}>{data.third}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          {data.inspections &&
            data.inspections.map((inspection) => (
              <View key={inspection.id} style={styles.formSection}>
                <View style={styles.formTitleSection}>
                  <Text style={styles.header}>
                    {inspection.inspection_form.short_name}
                  </Text>
                </View>
                <View style={styles.questionHeader}>
                  <View style={styles.questionTitleHeader}>
                    <Text style={styles.subHeader}>
                      {messages.PDF.question}
                    </Text>
                  </View>
                  <View style={styles.questionCarHeader}>
                    <Text style={styles.carNumberSubHeader}>
                      {messages.PDF.carNumber}
                    </Text>
                    <View style={styles.questionCarNumberHeader}>
                      {data.orderedMoveCars.map((car, index) => (
                        <Text key={car} style={styles.textCarNumber}>
                          {car}
                        </Text>
                      ))}
                    </View>
                  </View>
                </View>
                {inspection.inspection_form.inspection_form_sections.map(
                  (formSection, index) => (
                    <View key={index}>
                      {formSection.inspection_form_questions.map(
                        (question, index) => (
                          <View
                            key={question.id}
                            style={styles.formQuestionsSection}
                          >
                            <View style={styles.questionSection}>
                              <Text style={styles.textContent}>
                                {question.description}
                              </Text>
                            </View>
                            {renderQuestionAnswers(
                              question.question_type,
                              question.selectedCars,
                              question.comments
                            )}
                          </View>
                        )
                      )}
                    </View>
                  )
                )}
              </View>
            ))}
        </View>

        <View style={styles.section}>
          {data.signatures &&
            data.signatures.map((signature, index) => (
              <View key={signature.uri} style={styles.signatureItemSection}>
                <View key={index} style={styles.headerItemSection}>
                  <Text style={styles.textContent}>
                    {stringFormatter.toCapitalLetter(signature.signature_type)}
                  </Text>
                  <Text style={styles.textContent}>
                    #{signature.user.badge_number} - {signature.user.name}
                  </Text>
                </View>
                <View key={index} style={styles.headerItemSection}>
                  <Image src={signature.uri} style={styles.signatureImage} />
                </View>
              </View>
            ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.header, styles.formTitleSection]}>
            {messages.PDF.employeeHistory}
          </Text>
          {data.employeeHistory &&
            data.employeeHistory
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )
              .map((historyItem, index) => (
                <View style={styles.auditLogSection}>
                  <View style={styles.headerItemSection}>
                    <Text style={styles.textTitle}>
                      {messages.PDF.createdAt}
                    </Text>
                    <Text style={styles.subHeader}>
                      {dateFormatter.formatDateTime(historyItem.created_at)}
                    </Text>
                  </View>
                  <View style={styles.headerItemSection}>
                    <Text style={styles.textTitle}>{messages.PDF.user}</Text>
                    <Text style={styles.subHeader}>
                      {historyItem.user.name}
                    </Text>
                  </View>
                  <View style={styles.headerItemSection}>
                    <Text style={styles.textTitle}>{messages.PDF.action}</Text>
                    <Text style={styles.subHeader}>
                      {stringFormatter.formatEmployeeAction(historyItem.action)}
                    </Text>
                  </View>
                </View>
              ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
