import React from "react";
import styles from "./BubbleChartUI.module.scss";
import { useSelector } from "react-redux";

function BubbleChartUI(props) {
  const { data, handleClick } = props;
  const wordSelected = useSelector((state) => state.SelectedWords);
  return (
    <>
      <div
        style={{
          height: `${data.total}%`,
          width: `${data.total}%`,
          opacity: data.title === wordSelected.word && wordSelected.sentiment === null ? 0.5 : 1,
          // height:"100%",
          //  width:"100%",

        }}
        className={styles.container}
      >
        <div
          style={{
            width: `${data.count["positive"]}%`,
            backgroundColor: "#34e0a1",
            opacity:
              data.title === wordSelected.word && wordSelected.sentiment === "1"
                ? 0.5
                : 1,
          }}
          className={styles.bubbleEl}
          onClick={() => handleClick("1")}
        />
        <div
          style={{
            width: `${data.count["neutral"]}%`,
            backgroundColor: "#fcc207",
            opacity:
              data.title === wordSelected.word && wordSelected.sentiment === "0"
                ? 0.5
                : 1,
          }}
          className={styles.bubbleEl}
          onClick={() => handleClick("0")}
        />
        <div
          style={{
            width: `${data.count["negative"]}%`,
            backgroundColor: "#ff6960",
            opacity:
              data.title === wordSelected.word &&
              wordSelected.sentiment === "-1"
                ? 0.5
                : 1,
          }}
          className={styles.bubbleEl}
          onClick={() => handleClick("-1")}
        />
        <div className={styles.textView} onClick={() => handleClick(null)}>
          <label className={styles.labelText}>{data.title}</label>
          <p className={styles.valueText}>{data.count["positive"]}%</p>
        </div>
      </div>
    </>
  );
}
export default BubbleChartUI;
