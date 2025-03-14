import * as ExpenseHelper from "../../expense/helper";

export const get = async (req: any, res: any) => {
    const data = await ExpenseHelper.getExpense(req.realm);
    res.status(200);
    res.send(data.splice(0, 25));
    res.end();
};

export const getById = async (req: any, res: any) => {
    const data = await ExpenseHelper.getExpenseById(req.realm, req.params.id);
    res.status(200);
    res.send(data);
    res.end();
}

export const post = async (req: any, res: any) => {
    const data = await ExpenseHelper.createExpense(req.realm, req.body, req.user.user_id);
    res.status(200);
    res.send(data);
    res.end();
};

export const put = async (req: any, res: any) => {
    const data = await ExpenseHelper.updateExpenseById(req.realm, req.params.id, req.body, req.user.user_id);
    res.status(200);
    res.send(data);
    res.end();
};

export const deleteById = async (req: any, res: any) => {
    const data = await ExpenseHelper.deleteById(req.realm, req.params.id);
    res.status(200);
    res.send(data);
    res.end();
};
