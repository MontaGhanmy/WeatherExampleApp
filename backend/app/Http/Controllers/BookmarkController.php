<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Bookmark;

class BookmarkController extends Controller
{
    /**
     * ADD A NEW BOOKMARK
     */
    public function createBookmark(Request $request) {
        $request->validate([
            'city_name' => 'required'
        ]);
        $bookmark = new Bookmark();
        $bookmark->user_id = $request->user()->id;
        $bookmark->city_name = $request->city_name;
        $bookmark->save();

        return response()->json($bookmark);
    }

    /**
     * DELETE BOOKMARK
     */

    public function deleteBookmark(Request $request) {
        $request->validate([
            'city_name' => 'required'
        ]);

        $bookmark = Bookmark::where('user_id', $request->user()->id)->where('city_name', $request->city_name)->firstOrFail();
        $bookmark->delete();
        
        return response()->json(["status" => 200, "message" => "success!"]);
    }
}
