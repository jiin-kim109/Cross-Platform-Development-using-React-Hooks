import React, { Component, FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import Swiper from "react-native-swiper";
import { ProgressBar, withTheme } from "react-native-paper";

import { RootStackParamList } from "../../components/navigation/AuthStack";
import SurveySlide, {
  SingleChoice,
  MultiChoice,
  MultiChoiceList,
} from "./SurveySlide";
import FontText from "../../components/Text";
import { TouchableGradient, DisabledButton } from "../../components/Button";
import { StaticRenderee } from "../../util/hoc";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    flex: 1,
  },
  surveyBody: {
    flex: 6,
  },
  bottomView: {
    flex: 1.1,
  },
  slide: {
    flex: 1,
  },
  continueButton: {
    height: 60,
    marginHorizontal: 50,
    borderRadius: 30,
    justifyContent: "center",
  },
});

interface SurveyProps {
  navigation: StackNavigationProp<RootStackParamList, "Survey">;
  theme: ReactNativePaper.Theme;
}

interface SurveyState {
  progress: number;
}

const NUM_OF_SLIDES = 3;

class SurveyPage extends Component<SurveyProps, SurveyState> {
  private swiperRef: React.RefObject<Swiper>;

  private currSlideIndex: number;

  private resultToStore: Record<number, { key: string; items: Array<string> }>;

  private theme: ReactNativePaper.Theme;

  constructor(props: SurveyProps) {
    super(props);
    this.state = {
      progress: 1.0 / NUM_OF_SLIDES,
    };
    this.swiperRef = React.createRef();
    this.currSlideIndex = 0;
    this.resultToStore = {};

    this.theme = props.theme;
  }

  isContinueAllowed = (): boolean => {
    const currSuvResult = this.resultToStore[this.currSlideIndex];
    return currSuvResult && currSuvResult.items.length > 0;
  };

  onIndexChanged = (idx: number) => {
    this.setState({ progress: (idx + 1) / NUM_OF_SLIDES });
    this.currSlideIndex = idx;
    console.log("===================");
    console.log(this.resultToStore);
  };

  onItemSelected = (key: string, items: Array<string>) => {
    this.resultToStore[this.currSlideIndex] = { key, items };
  };

  onNextSlide = () => {
    const swiper = this.swiperRef.current;
    if (this.currSlideIndex < NUM_OF_SLIDES - 1) {
      swiper?.scrollBy(1, true);
    } else {
      // asyncStorage.save({ key, items });
      this.props.navigation.navigate("Main");
    }
  };

  onPrevSlide = () => {
    const swiper = this.swiperRef.current;
    if (this.currSlideIndex > 0) swiper?.scrollBy(-1, true);
  };

  render() {
    return (
      <View
        style={{
          ...styles.container,
          backgroundColor: this.theme.colors.white,
        }}
      >
        <View style={styles.headerView}>
          <ProgressBar
            style={{ height: 30 }}
            progress={this.state.progress}
            color={this.theme.colors.primaryGreen}
          />
          <StaticRenderee>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                paddingHorizontal: 17,
              }}
            >
              <FontText
                fontset={this.theme.fontsets.header}
                style={{ marginTop: -15, fontSize: 60 }}
                onPress={() => this.onPrevSlide()}
              >
                ‹
              </FontText>
              <FontText
                fontset={this.theme.fontsets.header}
                style={{ marginTop: 15, fontSize: 20 }}
                onPress={() => this.onNextSlide()}
              >
                SKIP
              </FontText>
            </View>
          </StaticRenderee>
        </View>

        <StaticRenderee>
          <View style={styles.surveyBody}>
            <Swiper
              ref={this.swiperRef}
              loop={false}
              index={0}
              scrollEnabled={false}
              showsPagination={false}
              onIndexChanged={this.onIndexChanged}
            >
              <View style={styles.slide}>
                <SurveySlide description={{ title: "I am a", subtitle: "" }}>
                  <SingleChoice
                    onItemSelected={this.onItemSelected}
                    survey={{
                      key: "gender",
                      items: ["WOMAN", "MAN", "MORE"],
                    }}
                  />
                </SurveySlide>
              </View>
              <View style={styles.slide}>
                <SurveySlide
                  description={{
                    title: "Passions",
                    subtitle:
                      "Let everyone know what you're passionate about by adding it to your profile.",
                  }}
                >
                  <MultiChoice
                    onItemSelected={this.onItemSelected}
                    survey={{
                      key: "passions",
                      items: [
                        "Disney",
                        "Athlete",
                        "Instagram",
                        "Working Out",
                        "Soccer",
                        "Grab a drink",
                        "DIY",
                        "Swimming",
                        "Music",
                        "Walking",
                      ],
                    }}
                  />
                </SurveySlide>
              </View>
              <View style={styles.slide}>
                <SurveySlide
                  description={{
                    title: "My sexual orientation is",
                    subtitle: "Select up to 3",
                  }}
                >
                  <MultiChoiceList
                    onItemSelected={this.onItemSelected}
                    maxChoiceNum={3}
                    survey={{
                      key: "sexualOrientation",
                      items: [
                        "Straight",
                        "Gay",
                        "Lesbian",
                        "Bisexual",
                        "Asexual",
                        "Demisexual",
                        "Transgender",
                        "Hetero",
                      ],
                    }}
                  />
                </SurveySlide>
              </View>
            </Swiper>
          </View>
        </StaticRenderee>

        <View style={styles.bottomView}>
          {this.isContinueAllowed() ? (
            <TouchableGradient
              style={styles.continueButton}
              onPress={() => this.onNextSlide()}
              theme={this.theme.colors.gradient.secondary}
              isShadow
            >
              <FontText
                style={{ textAlign: "center", color: "white" }}
                fontset={this.theme.fontsets.header2}
              >
                CONTINUE
              </FontText>
            </TouchableGradient>
          ) : (
            <DisabledButton style={styles.continueButton}>
              CONTINUE
            </DisabledButton>
          )}
        </View>
      </View>
    );
  }
}

export default withTheme(SurveyPage);
