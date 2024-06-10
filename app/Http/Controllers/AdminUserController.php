<?php

namespace App\Http\Controllers;

use App\Models\ActionHistory;
use App\Models\User;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $page = $request->get('page', 1);
        $perPage = $request->get('perPage', 10);
        $sort = $request->get('sort', ['field' => 'id', 'order' => 'asc']);

        $query = User::with('roles');

        if ($search) {
            $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('email', 'like', '%' . $search . '%')
                ->orWhere('id', 'like', '%' . $search . '%');
        }
        if ($sort['field'] === 'role') {
            $query->join('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
                ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
                ->select('users.*', 'roles.name as role');
        }

        $query->orderBy($sort['field'], $sort['order']);

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|unique:users,name,'. $id,
            'email' => 'required|email|unique:users,email'. $id,
            'role' => 'nullable|exists:roles,name'
        ]);

        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->syncRoles($request->role);
        $user->save();

        ActionHistory::create([
            'user_id' => auth()->id(),
            'action' => 'update',
            'model' => 'user',
            'old_value' => json_encode($user->getOriginal()),
            'new_value' => json_encode($user->getAttributes())
        ]);
    }

    public function updatePass(Request $request, $id)
    {
        $request->validate([
            'password' => 'required|string|min:8|confirmed'
        ]);

        $user = User::find($id);
        $user->password = bcrypt($request->password);
        $user->save();

        ActionHistory::create([
            'user_id' => auth()->id(),
            'action' => 'update',
            'model' => 'user',
            'old_value' => json_encode($user->getOriginal()),
            'new_value' => json_encode($user->getAttributes())
        ]);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();

        ActionHistory::create([
            'user_id' => auth()->id(),
            'action' => 'delete',
            'model' => 'user',
            'old_value' => json_encode($user->getOriginal())
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'nullable|exists:roles,name'
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
        $user->assignRole($request->role);

        ActionHistory::create([
            'user_id' => auth()->id(),
            'action' => 'create',
            'model' => 'user',
            'new_value' => json_encode($user->getAttributes())
        ]);
    }
}
