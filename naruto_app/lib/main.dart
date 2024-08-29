import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:naruto_app/modules/characters/character.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final _apiUrl = "https://narutodb.xyz/api/character";
  final _limit = 15;
  List<Character> _characters = [];
  int _page = 1;

  @override
  void initState() {
    super.initState();
    _fetchCharacters();
  }

  Future<void> _fetchCharacters() async {
    final response = await Dio()
        .get(_apiUrl, queryParameters: {"page": _page, "limit": _limit});
    final List<dynamic> data = response.data["characters"];
    setState(() {
      _characters = [
        ..._characters,
        ...data.map((data) => Character.fromJson(data))
      ];
      _page++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Naruto図鑑'),
          backgroundColor: Color(0xFFBCE2E8),
        ),
        body: Padding(
          padding: EdgeInsets.all(16),
          child: ListView.builder(
            itemCount: _characters.length,
            itemBuilder: (context, index) {
              final character = _characters[index];

              return Card(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Center(
                      child: character.images.isNotEmpty
                          ? Image.network(
                              character.images[0],
                              fit: BoxFit.contain,
                              errorBuilder: (context, error, stackTrace) {
                                return const Image(
                                  image: AssetImage("assets/dummy.png"),
                                );
                              },
                            )
                          : const Image(
                              image: AssetImage("assets/dummy.png"),
                            ),
                    ),
                    Padding(
                      padding: EdgeInsets.all(8.0),
                      child: Text(
                        character.name,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16.0,
                        ),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(left: 8.0, bottom: 8.0),
                      child: Text(
                        character.debut?["appearsIn"] ?? "なし",
                        style: const TextStyle(fontSize: 14.0),
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}
