import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:music_app/modules/songs/song.dart';

late SpotifyClient spotify;

Future setupSpotify() async {
  spotify = await SpotifyClient.initialize();
}

class SpotifyClient {
  late final String? token;
  static Dio dio = Dio();

  static Future<SpotifyClient> initialize() async {
    Response response = await dio.post(
      "https://accounts.spotify.com/api/token",
      data: {
        "grant_type": "client_credentials",
        "client_id": dotenv.env["SPOTIFY_CLIENT_ID"],
        "client_secret": dotenv.env["SPOTIFY_CLIENT_SECRET"],
      },
      options: Options(
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
      ),
    );
    SpotifyClient spotify = SpotifyClient();
    spotify.token = response.data["access_token"];
    return spotify;
  }

  Future<List<Song>> getPopularSongs() async {
    Response response = await dio.get(
      "https://api.spotify.com/v1/playlists/37i9dQZF1DX9vYRBO9gjDe/tracks",
      options: Options(
        headers: {"Authorization": "Bearer $token"},
      ),
    );
    return response.data["items"].map<Song>((item) {
      final song = item["track"];
      return Song.fromJson({
        "name": song["name"],
        "artistName": song["artists"][0]["name"],
        "albumImageUrl": song["album"]["images"][0]["url"],
        "previewUrl": song["preview_url"],
      });
    }).toList();
  }

  Future<List<Song>> searchSongs(String keyword) async {
    Response response = await dio.get("https://api.spotify.com/v1/search",
        options: Options(
          headers: {"Authorization": "Bearer $token"},
        ),
        queryParameters: {
          "q": keyword,
          "type": "track",
        });

    return response.data["tracks"]["items"].map<Song>((song) {
      return Song.fromJson({
        "name": song["name"],
        "artistName": song["artists"][0]["name"],
        "albumImageUrl": song["album"]["images"][0]["url"],
        "previewUrl": song["preview_url"],
      });
    }).toList();
  }
}
