import { Task } from "./tasks.interface.ts";

var tasks: Task[] = [
  {
    name: "one",
    description: "The task one",
  },
  {
    name: "two",
    description: "the task two",
  },
  {
    name: "three",
    description: "the task three",
  },
];

/**
   *Returns tasks
   *
   *@Method GET
   *@URL /api/tasks
   *
*/
const getTasks = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: tasks,
  };
};

/**
   *Returns task
   *
   *@Method GET
   *@URL /api/tasks/:name
   *
*/
const getTask = (
  { params, response }: { params: { name: string }; response: any },
) => {
  const task: Task | undefined = tasks.find((t) => t.name === params.name);

  if (task) {
    response.status = 200;
    response.body = {
      success: true,
      data: task,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No Found",
    };
  }
};

/**
   *Create task
   *
   *@Method POST
   *@URL /api/tasks
   *
*/
const createTask = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No data",
    };
  } else {
    const task: Task = body.value;
    tasks.push(task);
    response.status = 201;
    response.body = {
      success: true,
      data: task,
    };
  }
};

/**
   *Update task
   *
   *@Method PUT
   *@URL /api/tasks/:name
   *
*/
const updateTask = async (
  { params, request, response }: {
    params: { name: string };
    request: any;
    response: any;
  },
) => {
  const task: Task | undefined = tasks.find((t) => t.name === params.name);

  if (task) {
    const body = await request.body();
    const updateDate: { name?: string; description?: string } = body.value;
    tasks = tasks.map((t) =>
      t.name === params.name ? { ...t, ...updateDate } : t
    );
    response.status = 200;
    response.body = {
      success: true,
      data: tasks,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No Found",
    };
  }
};

/**
   *Remove task
   *
   *@Method DELETE
   *@URL /api/tasks/:name
   *
*/
const deleteTask = (
  { params, response }: { params: { name: string }; response: any },
) => {
  tasks = tasks.filter((t) => t.name !== params.name);
  response.body = {
    success: true,
    msg: "Task removed",
  };
};

export { getTasks, getTask, createTask, updateTask, deleteTask };
