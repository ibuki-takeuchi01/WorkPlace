import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_layout_grid/flutter_layout_grid.dart';
import 'package:music_app/lib/spotify.dart';
import 'package:music_app/modules/songs/song.dart';
import 'package:music_app/widgets/player.dart';
import 'package:music_app/widgets/song_card.dart';

void main() async {
  await dotenv.load(fileName: ".env");
  await setupSpotify();
  runApp(const MaterialApp(
    home: MusicApp(),
  ));
}

class MusicApp extends StatefulWidget {
  const MusicApp({
    super.key,
  });

  @override
  State<MusicApp> createState() => _MusicAppState();
}

class _MusicAppState extends State<MusicApp> {
  final AudioPlayer _audioPlayer = AudioPlayer();
  final ScrollController _controller = ScrollController();
  final _limit = 20;
  List<Song> _popularSongs = [];
  bool _isInitialized = false;
  Song? _selectedSong;
  bool _isPlay = false;
  String _keyword = "";
  List<Song>? _searchedSongs;
  int page = 1;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _initialize();
  }

  void _initialize() async {
    _controller.addListener(() {
      if (_controller.position.maxScrollExtent - 100 < _controller.offset &&
          _searchedSongs != null) {
        _searchSongs();
      }
    });

    final songs = await spotify.getPopularSongs();
    setState(() {
      _popularSongs = songs;
      _isInitialized = true;
    });
  }

  void _play() {
    _audioPlayer.play(UrlSource(_selectedSong!.previewUrl!));
    setState(() {
      _isPlay = true;
    });
  }

  void _stop() {
    _audioPlayer.stop();
    setState(() {
      _isPlay = false;
    });
  }

  void _handleSongSelected(Song song) {
    if (song.previewUrl == null) {
      _stop();
      return;
    }
    setState(() {
      _selectedSong = song;
    });
    _play();
  }

  void _handleTextFieldChanged(String value) {
    setState(() {
      _keyword = value;
    });
  }

  void _searchSongs() async {
    if (_isLoading) return;
    setState(() {
      _isLoading = true;
    });
    final offset = page * _limit;
    final songs = await spotify.searchSongs(
      keyword: _keyword,
      offset: offset,
      limit: _limit,
    );
    setState(() {
      page++;
      _searchedSongs =
          _searchedSongs != null ? [..._searchedSongs!, ...songs] : songs;
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final songs = _searchedSongs ?? _popularSongs;
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0E0E10),
        title: const Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Text(
              'Music App',
              textAlign: TextAlign.left,
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            )
          ],
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Stack(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    decoration: BoxDecoration(
                      color: const Color(0xFF1C1C1E),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Row(
                        children: [
                          const Icon(Icons.search,
                              color: Colors.white, size: 24),
                          const SizedBox(width: 8),
                          Expanded(
                            child: TextField(
                              style: const TextStyle(color: Colors.white),
                              decoration: const InputDecoration(
                                hintText: '探したい曲を入力してください',
                                hintStyle: TextStyle(color: Colors.white70),
                                border: InputBorder.none,
                              ),
                              onChanged: _handleTextFieldChanged,
                              onEditingComplete: () => _searchSongs(),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Songs',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Expanded(
                      child: !_isInitialized
                          ? Container()
                          : CustomScrollView(
                              controller: _controller,
                              slivers: [
                                SliverToBoxAdapter(
                                  child: LayoutGrid(
                                    columnSizes: [1.fr, 1.fr],
                                    rowSizes: List<
                                        IntrinsicContentTrackSize>.generate(
                                      (_popularSongs.length / 2).round(),
                                      (int index) => auto,
                                    ),
                                    children: songs
                                        .map((song) => SongCard(
                                              song: song,
                                              onTap: _handleSongSelected,
                                            ))
                                        .toList(),
                                  ),
                                )
                              ],
                            )),
                ],
              ),
              if (_selectedSong != null)
                Align(
                    alignment: Alignment.bottomCenter,
                    child: IntrinsicHeight(
                      child: Player(
                        song: _selectedSong!,
                        isPlay: _isPlay,
                        onButtonTab: () => _isPlay ? _stop() : _play(),
                      ),
                    ))
            ],
          ),
        ),
      ),
      backgroundColor: const Color(0xFF0E0E10),
    );
  }
}
