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
        ownerUser: issue.user ? issue.user.login : null,
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
 


 export interface Task {
      id: number,
      title: string;
      number: number,
      state: string,
      createdAt: string | null,
      updatedAt: string,
      closedAt: string | null,
      assignee: null | Assignee,  
      body : null | string,
      comments: number,
      ownerUser: string | null,
      repoUrl: string,
      order: number,
    }

  interface Assignee {
    login: string;
    htmlUrl: string;
    avatarUrl: string;
  }

  interface IssueApi {
    id: number,
    title: string;
    number: number,
    state: string,
    created_at: string | null,
    updated_at: string,
    closedAt: string | null,
    assignee: AssigneeApi | null,  
    body : null | string,
    comments: number,
    user: IssueAuthorApi,
    repository_url: string,
  }

  interface IssueAuthorApi {
    login: string;
  }
  interface AssigneeApi {
    login: string;
    html_url: string;
    avatar_url: string;
  }