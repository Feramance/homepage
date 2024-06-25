import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { widget } = service;

  const { data: githubIssues, error: githubIssuesError } = useWidgetAPI(widget, "issues");
  const { data: githubPulls, error: githubPullsError } = useWidgetAPI(widget, "pulls");
  const { data: githubStars, error: githubStarsError } = useWidgetAPI(widget, "stars");

  if (githubIssuesError || githubPullsError || githubStarsError) {
    return <Container service={service} error={githubIssuesError ?? githubPullsError ?? githubStarsError} />;
  }

  if (!githubIssues || !githubPulls || !githubStars) {
    return (
      <Container service={service}>
        <Block label="github.issues" />
        <Block label="github.pulls" />
        <Block label="github.stars" />
      </Container>
    );
  }

  return (
    <Container service={service}>
      <Block label="github.issues" value={githubIssues?.length ?? 0} />
      <Block label="github.pulls" value={githubPulls?.length ?? 0} />
      <Block label="github.stars" value={githubStars?.stargazers_count ?? 0} />
    </Container>
  );
}
