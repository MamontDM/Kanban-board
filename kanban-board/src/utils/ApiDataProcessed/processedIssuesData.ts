  import { Task } from "../../types/models";
  import { IssueApi } from "../../types/models";
 
 const processIssues = (issues : IssueApi[] | null) => {
    console.log(issues);
    
 if (!Array.isArray(issues)) {
  console.warn("processIssues received null or invalid issues, returning empty arrays.");
  return {
    todo: [],
    inProgress: [],
    done: []
  };
}

const calculateNumber = (issues: Task[]) : Task[] => {
  return issues.
  sort((a, b) => a.order - b.order)
  .map((issue, index) => ({...issue, order: index + 1 }));
};
 
 const processedIssues : Task[] = issues.map((issue, index) => ({
        id: issue.id,
        title: issue.title,
        number: issue.number,
        state: issue.state === "closed" ? "done" : issue.assignee ? "inProgress" : "todo",
        createdAt: issue.created_at,
        updatedAt: issue.updated_at,
        closedAt: issue.closedAt,
        assignee: issue.assignee
        ? {
            login: issue.assignee.login,
            avatarUrl: issue.assignee.avatar_url,
            htmlUrl: issue.assignee.html_url,
          }
        : null,
        body: issue.body,
        comments: issue.comments,
        ownerUser: issue.user ? issue.user.login : "",
        repoUrl: issue.repository_url,
        order: index +1,
    }));

    return {
      todo: calculateNumber(processedIssues.filter((issue) => issue.state === "todo")),
      inProgress: calculateNumber(processedIssues.filter((issues) => issues.state === "inProgress")),
      done: calculateNumber(processedIssues.filter((issues) => issues.state === "done")),
    }

  };
  export default processIssues;
 

